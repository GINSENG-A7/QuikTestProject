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

 const parentStore = useContext(CTX);

 return (
  <>
   <div class="post">
    <div class="post__data">
     <p>{post.title}</p>
    </div>
    <div class="post__btns">
     <button
      onClick$={() =>
       (parentStore.animals = Array.from(parentStore.animals).filter(
        (item) => item !== post
       ))
      }
     >
      Delete
     </button>
    </div>
   </div>
  </>
 );
});

export function deleteItem(items, item) {
 items = Array.from(items).filter((i) => i !== item);
}

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
