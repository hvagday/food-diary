import React, { useContext, useState } from "react";
import {
  Image,
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { PostContext } from "../contexts/PostContext";
import Swiper from "react-native-swiper";

const MainScreen = ({ navigation }) => {
  const { posts, addPost } = useContext(PostContext);
  const [selectedImages, setSelectedImages] = useState([]);

  const selectImage = () => {
    let options = {
      selectionLimit: 0,
      mediaType: "photo",
      includeBase64: false,
      includeExtra: false,
      maxWidth: 600,
      maxHeight: 600,
    };

    launchImageLibrary(options, (response) => {
      console.log(response);
      if (!response.didCancel && !response.error) {
        const images = response.assets.map((asset) => asset.uri);
        setSelectedImages(images);
        navigation.navigate("CreatePost", { images });
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Image
          source={require("../src/img/album-icon.png")}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.ScrollView}>
        {posts.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <Text style={styles.postLocation}>{post.location}</Text>
            {post.images && (
              <View style={styles.imageContainer}>
                <Swiper showsButtons={false}>
                  {post.images.map((image, imageIndex) => (
                    <Image
                      key={imageIndex}
                      source={{ uri: image }}
                      style={styles.postImage}
                      resizeMode="cover"
                    />
                  ))}
                </Swiper>
              </View>
            )}
            <Text style={styles.postText}>{post.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: "absolute",
    right: 30,
    top: 80,
    zIndex: 1,
  },
  ScrollView: {
    alignItems: "center",
    paddingTop: 130,
  },
  postContainer: {
    marginBottom: 0,
    // alignItems: "center",
  },
  postText: {
    marginTop: 10,
    // textAlign: "left",
    // paddingLeft: 50,
  },
  postLocation: {
    marginBottom: 10,
    // textAlign: "left",
    // paddingLeft: 50,
  },
  imageContainer: {
    alignItems: "center",
    height: 300,
    width: 300,
  },
  postImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    aspectRatio: 1,
  },
});

export default MainScreen;
