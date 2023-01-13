import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function checkIsInServer(req, res) {
  // Get the Next Auth session so we can use the accessToken as part of the discord API request
  const session = await unstable_getServerSession(req, res, authOptions);

  // Put Your Discord Server ID here
  const discordServerId = "834227967404146718";

  // Read the access token from the session
  const accessToken = session?.accessToken;

  // Make a request to the Discord API to get the servers this user is a part of
  const response = await fetch(`https://discordapp.com/api/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // You may get rate limitd here and receive an error.

  // Parse the response as JSON
  const data = await response.json();

  console.log(data);

  // Filter all the servers to find the one we want
  // Returns undefined if the user is not a member of the server
  // Returns the server object if the user is a member
  const web3sdksDiscordMembership = data?.find(
    (server) => server.id === discordServerId
  );

  // Return undefined or the server object to the client.
  res
    .status(200)
    .json({ web3sdksMembership: web3sdksDiscordMembership ?? undefined });
}
