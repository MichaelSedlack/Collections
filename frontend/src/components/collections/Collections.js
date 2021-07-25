import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CreateCollectionForm from "./CreateCollectionForm";
import CollectionForm from "./CollectionForm";
import SearchCollections from "./SearchCollections";
import collectionService from "../helpers/collectionService";
import { UserContext, RoomContext } from "./../UserContext";
import { ApiContext } from "../ApiContext";

function Collections() {
  const { user } = useContext(UserContext);
  const { room } = useContext(RoomContext);

  const history = useHistory();

  // Initial States
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  // only fires at beginning
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const res = await collectionService.getAll(room.id);

        if (res.error) {
          setIsLoading(false);
          setError(true);
          setMessage(res.error);
          return;
        }
        setCollections(res.collections);
        setIsLoading(false);
      } catch (exception) {
        setIsLoading(false);
        setError(true);
        setMessage(exception.message);
        console.log(exception);
      }
    })();
  }, [user]);

  const doCreate = async (collection) => {
    try {
      const res = await collectionService.create(collection);

      if (res.error) {
        setIsLoading(false);
        setError(true);
        setMessage(res.error);
        return res;
      }
      setIsLoading(false);
      const newCollections = [...collections, res];
      setCollections(newCollections);
    } catch (exception) {
      setIsLoading(false);
      setError(true);
      setMessage(exception.message);
      console.log(exception);
    }
  };

  const doSearch = async (search) => {
    try {
      const res = await collectionService.search(search, room.id);

      if (res.error) {
        setIsLoading(false);
        setError(true);
        setMessage(res.error);
        return res;
      }
      setIsLoading(false);
      setCollections(res);
    } catch (exception) {
      setIsLoading(false);
      setError(true);
      setMessage(exception.message);
      console.log(exception);
    }
  };

  const doDelete = async (collectionID) => {
    try {
      const res = await collectionService.deleteCollection(collectionID);

      if (res.error) {
        setIsLoading(false);
        setError(true);
        setMessage(res.error);
        return res;
      }
      setIsLoading(false);
      setTimeout(function () {
        setCollections(
          collections.filter((collection) => collection.id !== collectionID)
        );
        return res;
      }, 1000);

      return true;
    } catch (exception) {
      setIsLoading(false);
      setError(true);
      setMessage(exception.message);
      console.log(exception);
    }
  };

  const doUpdate = async (collectionID, newCollection) => {
    try {
      const res = await collectionService.update(collectionID, newCollection);

      if (res.error) {
        setIsLoading(false);
        setError(true);
        setMessage(res.error);
        return res;
      }
      setIsLoading(false);
      setTimeout(function () {
        setCollections(
          collections.map((collection) => {
            if (collectionID === collection.id) {
              return { ...collection, ...newCollection };
            }

            return collection;
          })
        );
      }, 500);
    } catch (exception) {
      setIsLoading(false);
      setError(true);
      setMessage(exception.message);
      console.log(exception);
    }
  };

  // If UseEffect hasn't finished then show loading message
  if (isLoading) {
    return <h4>Loading Webpage</h4>;
  } else if (error) {
    return <h1>{message}</h1>;
  } else {
    return (
      <div>
        <ApiContext.Provider value={{ doUpdate, doDelete, doSearch, doCreate }}>
          <Grid container spacing={3}>
            {/* Set up in to rows of length 12 */}
            <Grid item xs={12} md={12} lg={12} />

            {/* Begin Row (This row is split into 2+5+5=12)*/}
            <Grid item xs={4} sm={2} md={2} lg={2} />
            <Grid item xs={7} sm={5} md={5} lg={5}>
              <SearchCollections />
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <Button
                onClick={() => {
                  user.id !== room.uid
                    ? history.push("/publicrooms")
                    : history.push("/museum");
                }}
                color="primary"
              >
                {room.private
                  ? `${room.name} Room`
                  : user.id === room.uid
                  ? `${room.name} Room`
                  : `Public Room`}
              </Button>
              {">>"}
              <Button color="secondary">Collections</Button>
              <br />
            </Grid>
            {/* End Row */}

            {/* single row of nothing. Im using this to space things out */}
            <Grid item xs={12} md={12} lg={12} />

            {/* Begin Row */}
            <Grid item xs={1} md={1} lg={1} />
            <Grid item xs={11} sm={9} md={5} lg={4}>
              <span id="displayCollection">
                {user.id === room.uid ? (
                  <h1>{room.name} Collections</h1>
                ) : (
                  <h1>
                    {console.log(user.firstName)}
                    {room.firstName}'s Public {room.name} Collections
                  </h1>
                )}
              </span>
              <CollectionForm collections={collections} />
              {error && <div>{message}</div>}
            </Grid>
            <Grid item xs={2} sm={3} md={1} lg={2} />
            <Grid item xs={10} sm={9} md={4} lg={5}>
              <CreateCollectionForm />
            </Grid>
            {/* End Row */}

            <Grid item xs={12} md={12} lg={12} />
          </Grid>
        </ApiContext.Provider>
      </div>
    );
  }
}

export default Collections;
