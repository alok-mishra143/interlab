import { useUser } from "@clerk/clerk-react";

export default function GetUserinfo() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }

  if (isSignedIn) {
    return {
      email: user.primaryEmailAddress?.emailAddress,
      fullName: user.fullName,
      imageUrl: user.imageUrl,
      id: user.id,
    };
  }

  return null;
}
