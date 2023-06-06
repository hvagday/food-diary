import React, { useContext, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { View } from "react-native";
import { PostContext } from "../contexts/PostContext";

const CreatePostScreen = ({ navigation, route }) => {
  const { addPost } = useContext(PostContext);
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    addPost({ content, location, images: route.params.images });
    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        label="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TextInput label="Location" value={location} onChangeText={setLocation} />
      <Button onPress={handleSubmit}>Submit</Button>
    </View>
  );
};

export default CreatePostScreen;
