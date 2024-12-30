import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import UserBusinesses from "@/components/UserBusinesses";
import { useUserByUsername } from "@/hooks/tan-stack/useUsers";

const UserPage = () => {
  const { username } = useParams<{ username: string }>();

  const { data, isLoading, isError, error } = useUserByUsername(username);

  const fetchedUser = data?.data;
  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (isError) {
    return (
      <div>
        {error instanceof Error ? error.message : "Failed to fetch user data."}
      </div>
    );
  }

  if (!fetchedUser) {
    return <div>User not found. Please log in.</div>;
  }

  const userImage = fetchedUser?.image
    ? fetchedUser.image
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-32 h-32 shadow-lg">
            <AvatarFallback>
              <img
                src={userImage}
                alt={`${fetchedUser?.username}'s photo`}
                className="object-cover w-full h-full rounded-full"
              />
            </AvatarFallback>
          </Avatar>
          <div className="text-3xl font-bold text-black">
            {fetchedUser.username}
          </div>
          <div className="text-xl text-gray-500">{fetchedUser.email}</div>
          <div
            className={`text-lg font-semibold ${
              fetchedUser.plan === "Standard"
                ? "text-red-600"
                : fetchedUser.plan === "Gold"
                ? "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 text-transparent bg-clip-text"
                : "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text"
            }`}
          >
            Plan: {fetchedUser.plan}
          </div>
          <div className="flex items-center justify-between w-full mt-6 ">
            <div className="flex flex-col items-center w-1/2">
              <div className="text-lg font-semibold text-gray-500">
                Saved Businesses
              </div>
              <div className="mt-1 text-xl text-gray-500">
                {fetchedUser.savedBusinesses?.length || "0"}
              </div>
            </div>
            <div className="flex flex-col items-center w-1/2">
              <div className="text-lg font-semibold text-gray-500">
                Owned Businesses
              </div>
              <div className="mt-1 text-xl text-gray-500">
                {fetchedUser.ownBusinesses?.length || "0"}
              </div>
            </div>
          </div>
        </div>
      </Card>
      <UserBusinesses userId={fetchedUser._id} />
    </div>
  );
};

export default UserPage;