import { YStack, ScrollView } from "tamagui";
import { Post } from "components/Post";
import { useFeed } from "hooks/useFeed";
import { router } from "expo-router";

export default function Feed() {
  const { feed, loading, error } = useFeed();
  console.log("Feed data:", feed);
  const onPostPress = (postId: number) => {
    console.log("Post pressed:", postId);
    router.push(`/repte/${postId}`);
  };
  return (
    <ScrollView>
      <YStack bg="white" flex={1} p={40} gap={20}>
        {feed.map((post) => (
          <Post
            key={post.id}
            {...post}
            onPress={() => onPostPress(post.repte_id)}
          />
        ))}
      </YStack>
    </ScrollView>
  );
}
