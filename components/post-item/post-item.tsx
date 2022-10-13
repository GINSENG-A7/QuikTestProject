import {
  component$,
  useStylesScoped$,
  useStore,
  createContext,
  useContext,
} from "@builder.io/qwik";
import styles from "./post-item.css?inline";
import { CTX } from "../posts-list/posts-list";

export default component$(({ post }) => {
  useStylesScoped$(styles);

  const animal = useContext(CTX);

  return (
    <>
      <div class="post">
        <div class="post__data">
          <p>{post}</p>
        </div>
        <div class="post__btns">
          <button onClick$={() => animal.filter((item) => item !== post)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
});

export async function fetchPosts(page, limit) {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
    {
      params: {
        _page: page,
        _limit: limit,
      },
    }
  );
  console.log(response.data);
  return response.data;
  // const posts = ["Dog", "Fox", "Owl", "Rat", "Goat"];
}
