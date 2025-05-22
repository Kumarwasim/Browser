import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { WebView } from "react-native-webview";

export default function Index() {
  const [searchtext, setSeachtext] = useState("");
  const [webUrl, setWebUrl] = useState("https://google.com");
  const [progress, setProgress] = useState(0);
  if (progress === 0 || progress === 1) {
  }
  const handleChange = (text: string) => {
    setSeachtext(text);
  };
  const handleSearch = () => {
    if (searchtext.includes(" ")) {
      setWebUrl(`https://www.google.com/search?q=${searchtext}`);
    } else if (
      (searchtext.startsWith("http://") || searchtext.startsWith("https://")) &&
      (searchtext.endsWith(".com") ||
        searchtext.endsWith(".in") ||
        searchtext.endsWith(".org"))
    ) {
      setWebUrl(`${searchtext}`);
    } else if (
      searchtext.endsWith(".com") ||
      searchtext.endsWith(".in") ||
      searchtext.endsWith(".org")
    ) {
      setWebUrl(`http://${searchtext}`);
    } else {
      setWebUrl(`https://www.google.com/search?q=${searchtext}`);
    }
  };
  return (
    <View className="">
      <View className="flex-row px-7 py-1 border border-gray-400 bg-white rounded-lg shadow-slate-600 items-center justify-center">
        <TextInput
          className="w-full outline-none"
          keyboardType="web-search"
          placeholder="Search here"
          onChangeText={handleChange}
          onSubmitEditing={handleSearch}
          value={searchtext}
          autoCorrect={false}
        />

        <Feather name="search" size={28} color="black" onPress={handleSearch} />
      </View>

      <View className="h-1 w-full bg-gray-200">
        <View
          className="h-1 bg-blue-500"
          style={{ width: `${progress * 100}%` }}
        ></View>
      </View>
      <View className="h-full w-full">
        <WebView
          className=""
          source={{ uri: webUrl }}
          onLoadProgress={({ nativeEvent }) => {
            setProgress(nativeEvent.progress);
          }}
        />
      </View>
    </View>
  );
}
