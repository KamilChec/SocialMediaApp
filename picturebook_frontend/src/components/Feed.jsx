import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { feedQuery, searchQuery } from "../utils/data";
import { client } from "../client";
import { MasonryLayout } from "./MasonryLayout";
import { Spinner } from "./Spinner";

export function Feed() {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState();
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner message="We are adding new ideas to your feed!" />;
  }

  return <div className="">{pins && <MasonryLayout pins={pins} />}</div>;
}
