"use client";

export default function ActivityCard({ data, isSaved, onSave }) {
  return (
    <div className="border border-gray-300 rounded-xl w-1/2 mx-auto mb-5 p-5 relative">
      <button className={`absolute right-5 rounded w-8 `} onClick={onSave}>
        {isSaved ? "❤️" : "🤍"}
      </button>
      <h1 className="text-xl font-semibold mr-3">{data.activity}</h1>
      <span className="">
        {data.type.charAt(0).toUpperCase() + data.type.slice(1)} |
      </span>
      {data.participants === 1 ? (
        <span> {data.participants} participant</span>
      ) : (
        <span> {data.participants} participants</span>
      )}
      <p className="mt-5">
        Price: {data.price === 0 ? "Free" : `${data.price}`}
      </p>
      <p>Accessibility: {data.accessibility}</p>
    </div>
  );
}
