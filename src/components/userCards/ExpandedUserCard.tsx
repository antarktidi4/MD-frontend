import { User } from "@api/commonTypes/user";
import Avatar from "./Avatar";

export default function ExpandedUserCard({ username, avatar, about }: User) {
  return (
    <div class="flex flex-row p-2 rounded shadow-sm bg-nord1">
      <Avatar nickname={username} url={avatar} size={128} />
      <div class="flex flex-col w-full ms-2">
        <p class="text-xl">
          {username.toLowerCase().includes("aniki") ? `✿ ${username} ✿` : username}
        </p>
        <p class="w-full h-full rounded">
          {about === null ? `Нам ничего не известно о ${username}.` : about}
        </p>
      </div>
    </div>
  );
}
