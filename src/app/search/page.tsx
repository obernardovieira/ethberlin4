"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/db";
import Link from "next/link";
import { useUserContext } from "@/contexts/UserContext";

interface SearchResult {
  mentor_id: number;
  mentor_identifier: string;
  social: object;
  username: string;
  bio: string;
  topic_title: string;
  topic_description: string;
  connection_status: boolean;
  events: object;
}

function SearchRoute() {
  const { userId } = useUserContext();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  useEffect(() => {
    const loadSearchResults = async () => {
      const { data: mentors_by_topic, error } = await supabase.rpc(
        "get_mentors_with_connection_status",
        {
          current_user_identifier: userId,
        }
      );

      if (!mentors_by_topic || mentors_by_topic.length === 0 || error) {
        console.error("Error reading mentors_by_topic", error);
        return;
      }

      setSearchResults(mentors_by_topic);
    };
    loadSearchResults();
  }, []);

  return (
    <ul>
      {searchResults.map((result) => (
        <li key={result.mentor_id}>
          <div>
            <p>
              {result.username || result.mentor_identifier} ({result.bio}) (
              {result.topic_title}: {result.topic_description}) (
              {result.connection_status})
            </p>
            <Link href={`/search/apply/${result.mentor_id}`}>Apply</Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SearchRoute;
