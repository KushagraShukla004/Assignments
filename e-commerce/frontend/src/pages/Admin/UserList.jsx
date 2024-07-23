/* eslint-disable no-unused-vars */
import { Trash2, Pencil, CircleCheck, CircleX } from "lucide-react";
import Loader from "../../components/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Message from "../../components/Message";
import Card from "../../components/Card";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  // Fetch users
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  // Edit users
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  // Delete users
  const [deleteUser] = useDeleteUserMutation();
  // Update users
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex h-dvh w-dvw justify-center py-20 max-lg:pl-[4rem] lg:pl-[2rem]">
      <AdminMenu />
      <Card>
        <h1 className="mb-5 flex justify-center text-3xl font-semibold tracking-wider max-phone:text-2xl">
          All Users
        </h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="flex justify-center overflow-x-auto">
            <table className="min-w-[90%] divide-y divide-gray-200 border border-purple-500">
              <thead className="text-lg">
                <tr>
                  <th className="hidden px-4 py-2 text-left font-medium uppercase tracking-wider text-white md:table-cell">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left font-medium uppercase tracking-wider text-white">
                    NAME
                  </th>
                  <th className="px-4 py-2 text-left font-medium uppercase tracking-wider text-white">
                    EMAIL
                  </th>
                  <th className="px-8 text-left font-medium uppercase tracking-wider text-white">
                    ADMIN
                  </th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="hidden whitespace-nowrap px-4 py-2 md:table-cell">
                      {user._id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                            className="w-full rounded-lg border p-2"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
                          >
                            <CircleCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">{user.username}</div>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserEmail}
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                            className="w-full rounded-lg border p-2"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
                          >
                            <CircleCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <a
                            href={`mailto:${user.email}`}
                            className="text-blue-500"
                          >
                            {user.email}
                          </a>
                        </div>
                      )}
                    </td>
                    <td className="flex items-center justify-start space-x-4 whitespace-nowrap">
                      <div className="p-2">
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <Pencil className="text-white" />
                        </button>
                      </div>
                      <div>
                        {user.isAdmin ? (
                          <CircleCheck className="text-green-500" />
                        ) : (
                          <CircleX className="text-red-500" />
                        )}
                      </div>
                      <div className="py-2">
                        {!user.isAdmin && (
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
                          >
                            <Trash2 />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserList;
