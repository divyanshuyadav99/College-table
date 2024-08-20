import React, { useState, useEffect, useCallback } from "react";
import collegesData from "../colleges.json";

const Table = () => {
  const [colleges, setColleges] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    setColleges(collegesData.slice(0, visibleCount));
    console.log(colleges.length);
  }, [visibleCount]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    console.log("User scrolling");
    setVisibleCount((prevCount) => prevCount + 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedColleges = React.useMemo(() => {
    let sortableColleges = [...colleges];
    if (sortConfig !== null) {
      sortableColleges.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableColleges;
  }, [colleges, sortConfig]);

  const filteredColleges = sortedColleges.filter((college) =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <input
        type="text"
        placeholder="Search by college name"
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-left">
          <thead>
            <tr className="bg-teal-100 text-gray-700 text-sm uppercase font-semibold">
              <th
                className="py-3 px-4 border-b-2 border-gray-200 cursor-pointer"
                onClick={() => handleSort("ranking")}
              >
                CD Rank
              </th>
              <th className="py-3 px-4 border-b-2 border-gray-200">
                Colleges
              </th>
              <th
                className="py-3 px-4 border-b-2 border-gray-200 cursor-pointer"
                onClick={() => handleSort("fees")}
              >
                Course Fees
              </th>
              <th
                className="py-3 px-4 border-b-2 border-gray-200 cursor-pointer"
                onClick={() => handleSort("placement")}
              >
                Placement
              </th>
              <th
                className="py-3 px-4 border-b-2 border-gray-200 cursor-pointer"
                onClick={() => handleSort("userReviewRating")}
              >
                User Reviews
              </th>
              <th
                className="py-3 px-4 border-b-2 border-gray-200 cursor-pointer"
                onClick={() => handleSort("ranking")}
              >
                Ranking
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredColleges.map((college, index) => (
              <tr
                key={college.id}
                className={`hover:bg-gray-50 ${
                  college.featured ? "bg-pink-100" : ""
                }`}
              >
                <td className="py-3 px-4 border-b border-gray-200">
                  #{index + 1}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <div className="flex flex-col">
                    {college.featured && (
                      <span className="mb-1 bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded self-start">
                        Featured
                      </span>
                    )}
                    <span className="font-medium text-blue-700">
                      {college.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      Location, State
                    </span>
                    <div className="mt-2 flex space-x-2">
                      <a href="#" className="text-orange-600 text-sm">
                        Apply Now
                      </a>
                      <a href="#" className="text-teal-600 text-sm">
                        Download Brochure
                      </a>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">
                      ₹ {college.fees.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">B.Tech Fees</span>
                    <a href="#" className="text-orange-600 text-sm">
                      Compare Fees
                    </a>
                  </div>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">₹2,00,000</span>
                    <span className="text-sm text-gray-500">Avg Package</span>
                    <span className="text-sm text-gray-500">
                      Campus Placement
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">
                      {college.userReviewRating}/10
                    </span>
                    <span className="text-sm text-gray-500">
                      Based on 300 reviews
                    </span>
                    <span className="text-sm text-yellow-600">
                      Best in Social Life
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">#1</span>
                    <span className="text-sm text-gray-500">#313 in India</span>
                    <a href="#" className="text-teal-600 text-sm">
                      + More
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
