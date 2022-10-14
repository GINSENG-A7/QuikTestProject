import {
 component$,
 useStylesScoped$,
 useStore,
 useClientEffect$,
 useResource$,
 createContext,
 useContextProvider,
} from "@builder.io/qwik";
import axios from "axios";
import PostItem from "../post-item/post-item";
import styles from "./posts-list.css?inline";

export const CTX = createContext("stuff");

export default component$(() => {
 useStylesScoped$(styles);
 const limit = 21;
 const store = useStore(
  {
   animals: ["Dog", "Bird", "Cat", "Mouse", "Horse"],
   page: 1,
   posts: [],
  },
  { recursive: true }
 );

 const posts = useResource$<object[]>(({ cleanup }) => {
  const controller = new AbortController();
  cleanup(() => controller.abort());
  return fetchPosts(store.page, limit);
 });
 console.log(posts);

 store.posts = posts;
 useContextProvider(CTX, store);

 return (
  <>
   <div class="posts">
    <ul>
     {Array.from(posts).map((post, index) => (
      <PostItem post={post} key={index}></PostItem>
     ))}
    </ul>
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
