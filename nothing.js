import React, { useContext, useState, useEffect } from "react";
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

  useEffect(() => {
    if (selectedImages.length > 0) {
      addPost({ content: "", location: "", images: [...selectedImages] });
      setSelectedImages([]);
    }
  }, [selectedImages]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Image
          source={require("../src/img/star-icon.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {posts.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <Text style={styles.postLocation}>{post.location}</Text>
            {post.images && (
              <View style={styles.imageContainer}>
                <Swiper
                  showsButtons={false}
                  style={styles.imageSwiper}
                  dotStyle={styles.swiperDot}
                  activeDotStyle={styles.swiperActiveDot}
                >
                  {post.images.map((image, imageIndex) => (
                    <View key={imageIndex} style={styles.slide}>
                      <Image
                        source={{ uri: image }}
                        style={styles.postImage}
                        resizeMode="cover"
                      />
                    </View>
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
    right: 10,
    top: 50,
    zIndex: 1,
  },
  scrollView: {
    alignItems: "center",
    paddingTop: 120,
  },
  postContainer: {
    marginBottom: 20,
    marginLeft: 20,
  },
  postText: {
    marginTop: 10,
  },
  postLocation: {
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    height: 200,
  },
  imageSwiper: {
    height: 200,
    width: "100%",
  },
  swiperDot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  swiperActiveDot: {
    backgroundColor: "#000",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default MainScreen;
