import { Review } from "@api/commonTypes/review";
import ColoredRating from "@components/atomic/ColoredRating"
import Avatar from "@components/userCards/Avatar";
import markdownSettings from "@utils/markdownSettings";
import ReactMarkdown from "react-markdown";

export default function ReviewCard({ id, user, review, rating }: Review) {
  return (
    <div class="flex flex-col p-2 mb-1 w-full break-words rounded shadow-sm bg-nord2" key={id}>
      <a class="mb-1 hover:text-nord4" href={`/user/${user.id}`}>
        <div class="flex flex-row gap-2">
          <Avatar nickname={user.username} url={user.avatar} />
          <p class="flex flex-row gap-1">{user.username} (<ColoredRating rating={rating} />)</p>
        </div>
      </a>
      <ReactMarkdown components={markdownSettings}>
        {review}
      </ReactMarkdown>
    </div>
  );
}
