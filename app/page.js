"use client";

import { useEffect, useState } from "react";
import ActivityCard from "./components/ActivityCard";

export default function Home() {
  const [activity, setActivity] = useState("");
  const [participants, setParticipants] = useState("");
  const [data, setData] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [savedActivities, setSavedActivities] = useState([]);
  const [isRandom, setIsRandom] = useState(false);

  async function fetchAPI() {
    let url = "";
    if (activity && participants) {
      url = `https://bored-api.appbrewery.com/filter?type=${activity}&participants=${participants}`;
      setIsRandom(false);
    } else if (activity) {
      url = `https://bored-api.appbrewery.com/filter?type=${activity}`;
      setIsRandom(false);
    } else if (participants) {
      url = `https://bored-api.appbrewery.com/filter?participants=${participants}`;
      setIsRandom(false);
    } else {
      url = "https://bored-api.appbrewery.com/random";
      setIsRandom(true);
    }

    const proxy = "https://thingproxy.freeboard.io/fetch/";
    try {
      const response = await fetch(proxy + url);
      const result = await response.json();
      setData(Array.isArray(result) ? result : [result]);
      console.log("Result:", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setActivity("");
    setParticipants("");
  }

  useEffect(() => {
    fetchAPI().then((result) => setData(result));
  }, []);

  function toggleSaveActivity(activity) {
    setSavedActivities((prev) => {
      const isAlreadySaved = prev.some((a) => a.key === activity.key);
      return isAlreadySaved
        ? prev.filter((a) => a.key !== activity.key)
        : [...prev, activity];
    });
  }

  function handleSaveActivity() {
    setShowSaved((prev) => !prev);
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-center my-10 ">
        Random Activity Suggestion
      </h1>
      <div className="flex flex-col w-1/2 mx-auto ">
        <button
          onClick={handleSaveActivity}
          className="border border-gray-400 hover:bg-red-300 hover:border-red-300 w-16 rounded-md self-end mb-3"
        >
          {showSaved ? "All" : "Saved"}
        </button>
        <select
          className="mb-5 border border-gray-600 p-3 rounded-lg focus:outline-gray-700"
          onChange={(e) => {
            setActivity(e.target.value);
          }}
          value={activity}
        >
          <option value="">Type of activity</option>
          <option value="education">Education</option>
          <option value="recreational">Recreational</option>
          <option value="social">Social</option>
          <option value="charity">Charity</option>
          <option value="cooking">Cooking</option>
          <option value="relaxation">Relaxation</option>
          <option value="busywork">Busywork</option>
        </select>
        <select
          className="mb-5 border border-gray-600 p-3 rounded-lg focus:outline-gray-700"
          onChange={(e) => {
            setParticipants(e.target.value);
          }}
          value={participants}
        >
          <option value="">Number of participants</option>
          <option value="1">1 participant</option>
          <option value="2">2 participants</option>
          <option value="3">3 participants</option>
          <option value="4">4 participants</option>
          <option value="5">5 participants</option>
          <option value="6">6 participants</option>
          <option value="8">8 participants</option>
        </select>
      </div>
      <button
        onClick={fetchAPI}
        className="w-1/2 mx-auto bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mt-5"
      >
        Generate Activities
      </button>
      <h2 className="mt-10 mb-5 text-xl mx-auto w-1/2">
        {!isRandom && !showSaved && data?.length
          ? `${data.length} Suggestions`
          : isRandom && data?.length
          ? "Random Activity Recommendation"
          : showSaved
          ? `${savedActivities.length} Saved Activities`
          : ""}
      </h2>
      <div>
        {showSaved ? (
          savedActivities.length > 0 ? (
            savedActivities.map((activity) => (
              <ActivityCard
                key={activity.key}
                data={activity}
                isSaved={true}
                onSave={() => toggleSaveActivity(activity)}
              />
            ))
          ) : (
            <p className="text-center mt-5">No saved activities yet.</p>
          )
        ) : data ? (
          data.error ? (
            <p className="text-center mt-5">{data.error}</p>
          ) : data.length > 0 ? (
            data.map((activity, index) => (
              <ActivityCard
                key={activity.key || index}
                data={activity}
                isSaved={savedActivities.some((a) => a.key === activity.key)}
                onSave={() => toggleSaveActivity(activity)}
              />
            ))
          ) : null
        ) : null}
      </div>
    </div>
  );
}
