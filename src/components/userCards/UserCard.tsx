import { User } from "@api/commonTypes/user";
import Avatar from "./Avatar"

export enum Direction {
  LEFT,
  RIGHT
}

type UserCardProps = {
  direction?: Direction;
} & User;

export default function UserCard({ direction = Direction.LEFT, username, id, avatar }: UserCardProps) {
  return (
    <a class="flex flex-row gap-2 hover:text-nord7 cursor-pointer my-auto" href={`/user/${id}`}>
      <div class="my-auto">{direction === Direction.LEFT && <Avatar nickname={username} url={avatar} />}</div>
      <div class="pt-0.5">{username}</div>
      <div class="my-auto">{direction === Direction.RIGHT && <Avatar nickname={username} url={avatar} />}</div>
    </a>
  );
}
