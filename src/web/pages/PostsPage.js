import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Post } from "../components/Post";

// import { usePostsSelector } from "../customHooks/stateSelectors";
// import { postsActions } from "../slices/posts";
// import { settingsActions } from "../slices/settings";

const PostsPage = () => {
    // const dispatch = useDispatch();
    // const { list, loading, errors } = usePostsSelector();

    // useEffect(() => {
    //   dispatch(postsActions.getPosts());
    //   dispatch(settingsActions.getSettings());
    // }, [dispatch]);

    // const renderPosts = () => {
    //   if (loading) return <p>Loading posts...</p>;
    //   if (errors) return <p>Unable to display posts.</p>;

    //   return list.map((post) => <Post key={post.id} post={post} excerpt />);
    // };

    return (
      <section>
        <h1>Posts</h1>
        {/* {renderPosts()} */}
      </section>
    );
  };

  export default PostsPage;
