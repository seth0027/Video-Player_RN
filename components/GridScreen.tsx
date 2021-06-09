import { Video } from "expo-av";
import React from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import * as Response from "../videos.json";

export const BASE_URL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/";

export const GridScreen = () => {
  const [data, setData] = React.useState<namespace.RootObject>();

  React.useEffect(() => {
    const getData = async () => {
      setData(Response as namespace.RootObject);
    };

    getData();
  }, []);
  const getVideos = (data: namespace.RootObject) => {
    const arr = data.categories
      .map((cat) => cat.videos)
      .reduce((prev, next) => {
        return prev.concat(next);
      });

    return arr;
  };

  return <View>{data && <VideoGrid videos={getVideos(data)} />}</View>;
};

const VideoGrid = ({ videos }: { videos: namespace.Video[] }) => {
  return (
    <View style={{ padding: 10, marginTop: 20 }}>
      <FlatList
        keyExtractor={(item) => item.title}
        data={videos}
        renderItem={({ item }) => <VideoItem video={item} />}
        numColumns={2}
        ListHeaderComponent={
          <Text style={{ fontWeight: "600", fontSize: 20 }}>Videos</Text>
        }
      />
    </View>
  );
};

const VideoItem = ({ video }: { video: namespace.Video }) => {
  return (
    <View key={video.title} style={{ padding: 10, width: 180, height: 180 }}>
      <Text style={{ fontSize: 15 }}>{video.title}</Text>
      <Video
        style={{ width: 150, height: 150 }}
        source={{ uri: video.sources[0] }}
        useNativeControls
        resizeMode="contain"
      />
    </View>
  );
};
