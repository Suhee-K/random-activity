"use client";

export default function ActivityCard({ data }) {
  const [isSaved, setIsSaved] = useState(false);

  function saveActivity() {
    setIsSaved((prev) => !prev);
  }

  return (
    <div>
      <h1>{data.activity}</h1>
      <p>Participants: {data.participants}</p>
      <p>Price: {data.price === 0 ? "Free" : `${data.price}`}</p>
      <p>Accessibility: {data.accessibility}</p>
      <button
        className={`mt-2 px-4 py-2 rounded ${
          isSaved ? "bg-red-400 text-white" : "bg-gray-200"
        }`}
        onClick={saveActivity}
      />
    </div>
  );
}
