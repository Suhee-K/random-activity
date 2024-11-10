"use client";

import { useEffect, useState } from "react";
import ActivityCard from "./components/ActivityCard";

export default function Home() {
  const [activity, setActivity] = useState("");
  const [participants, setParticipants] = useState("");
  const [data, setData] = useState(null);

  function generateURL() {
    if (!activity && !participants) {
      return "https://bored-api.appbrewery.com/random";
    }
    if (activity && !participants) {
      return `https://bored-api.appbrewery.com/filter?type=${activity}`;
    }
    if (!activity && participants) {
      return `https://bored-api.appbrewery.com/filter?participants=${participants}`;
    }
    return `https://bored-api.appbrewery.com/filter?type=${activity}&participants=${participants}`;
  }

  async function fetchAPI() {
    const url = generateURL();
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }

  useEffect(() => {
    fetchAPI().then((result) => setData(result));
  }, [activity, participants]);

  async function handleClick() {
    const result = await fetchAPI();
    setData(result);
    console.log(result);
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-center my-10 ">
        Random Activity Suggestion
      </h1>
      <div className="flex flex-col w-1/2 mx-auto ">
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
        onClick={handleClick}
        className="w-1/2 mx-auto bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mt-5"
      >
        Generate Activities
      </button>
      {data && <ActivityCard data={data} />}
    </div>
  );
}
