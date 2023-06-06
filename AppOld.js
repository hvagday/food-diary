import React, { useState } from "react";
import {
  Button,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Modal from "react-native-modal";

const App = () => {
  const [resourcePath, setResourcePath] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const selectImage = () => {
    let options = {
      selectionLimit: 0, // Default is 1, use 0 to allow any number of files
      mediaType: "photo",
      includeBase64: false,
      includeExtra: false,
      maxWidth: 600, // To resize the image
      maxHeight: 600, // To resize the image
    };

    launchImageLibrary(options, (response) => {
      console.log(response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setResourcePath(response.assets);
      }
    });
  };

  const takePhoto = () => {
    let options = {
      saveToPhotos: true,
      mediaType: "photo",
      includeBase64: false,
      includeExtra: false,
    };

    launchCamera(options, (response) => {
      console.log(response);

      if (response.didCancel) {
        console.log("User cancelled camera picker");
      } else if (response.errorCode) {
        console.log("CameraPicker Error: ", response.error);
      } else {
        setResourcePath(response.assets);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={require("./src/img/star-icon.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>

      <Modal isVisible={modalVisible} style={styles.bottomModal}>
        <View style={styles.scrollableModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={selectImage}>
              <Image
                source={require("./src/img/album-icon.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhoto}>
              <Image
                source={require("./src/img/camera-icon.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </View>
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      {resourcePath.length > 0 &&
        resourcePath.map((resource, index) => {
          console.log(resource);
          return (
            <Image
              key={`resource` + index}
              source={{ uri: resource.uri }}
              style={{ width: 110, height: 110 }}
            />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  scrollableModal: {
    backgroundColor: "white",
    padding: "5%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginBottom: 20,
  },
});

export default App;
