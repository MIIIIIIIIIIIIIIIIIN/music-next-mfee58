import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AB_LIST, AB_DEL_DELETE } from "@/config/api-path";

const useFetchDB = () => {
  const [listData, setListData] = useState({ rows: [] });
  const [albumsimg, setAlbumsImg] = useState({});
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  // Delete
  const delItem = (p_albums_id) => {
    console.log({ p_albums_id });
    fetch(`${AB_DEL_DELETE}/${p_albums_id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          router.push(location.search, undefined, { scroll: false });
        }
      });
  };

  // Fetch list data
  useEffect(() => {
    if (!router.isReady) return;
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`${AB_LIST}${location.search}`, { signal })
      .then((r) => r.json())
      .then((obj) => {
        if (obj) {
          setListData(obj);
        } else if (obj.redirect) {
          router.push(obj.redirect);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });

    return () => {
      controller.abort();
    };
  }, [router]);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/getGenres");
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch album images
  useEffect(() => {
    if (listData.rows.length === 0) return;
    const controller = new AbortController();
    const signal = controller.signal;

    const getImages = async () => {
      try {
        await Promise.all(
          listData.rows.map((album) =>
            axios
              .get(`http://localhost:3005/api/getImages/${album.p_albums_id}`, {
                signal,
              })
              .then((response) => {
                const imgObj = response.data;
                if (imgObj) {
                  setAlbumsImg((abimg) => ({
                    ...abimg,
                    [album.p_albums_id]: imgObj.images,
                  }));
                }
              })
              .catch((error) => {
                if (axios.isCancel(error)) {
                  console.log("Request canceled");
                } else {
                  console.error("Fetch error:", error);
                }
              })
          )
        );
      } catch (error) {
        console.error("Error in getImages:", error);
      }
    };

    getImages();
    return () => {
      controller.abort();
    };
  }, [listData]);

  return { listData, albumsimg, genres };
};

export default useFetchDB;
