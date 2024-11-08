export default function fetchStories() {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("feed-post") ?? JSON.stringify(""));
    }
  }
