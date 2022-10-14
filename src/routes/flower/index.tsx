import {
  component$,
  useClientEffect$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import PostsList from "../../components/posts-list/posts-list";
import styles from "./flower.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const state = useStore({
    count: 0,
    number: 20,
  });

  useClientEffect$(() => {});

  return (
    <>
      <div class="container">
        <PostsList></PostsList>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Flower",
};
