import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CreateItemForm from "./CreateItemForm";
import ItemForm from "./ItemForm";
import SearchItems from "./SearchItems";
import itemService from "../helpers/itemService";
import { UserContext, RoomContext, CollectionContext } from "./../UserContext";
import { ApiContext } from "../ApiContext";

function Items() {
  const { user } = useContext(UserContext);
  const { room } = useContext(RoomContext);
  const { collection } = useContext(CollectionContext);

  const history = useHistory();

  // Initial States
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [keys, setKeys] = useState([]);

  // only fires at beginning
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const res = await itemService.getAll(collection.id);

        if (res.error) {
          setIsLoading(false);
          setError(true);
          setMessage(res.error);
          return;
        }
        console.log(`Response from API ITEMS: ${res.keys}`);
        setKeys(res.keys);
        setItems(res.items);
        setIsLoading(false);
      } catch (exception) {
        setIsLoading(false);
        setError(true);
        setMessage(exception.message);
        console.log(exception);
      }
    })();
  }, [user]);

  const doCreate = async (item) => {
    try {
      const res = await itemService.create(item);

      if (res.error) {
        setIsLoading(false);
        setError(true);
        setMessage(res.error);
        return res;
      }
      setIsLoading(false);
      const newItems = [...items, res];
      setItems(newItems);
    } catch (exception) {
      setIsLoading(false);
      setError(true);
      setMessage(exception.message);
      console.log(exception);
    }
  };

  const doSearch = async (search) => {
    try {
      const res = await itemService.search(search, collection.id);

      if (res.error) {
        setIsLoading(false);
        setError(true);
        setMessage(res.error);
        return res;
      }
      setIsLoading(false);
      setItems(res);
    } catch (exception) {
      setIsLoading(false);
      setError(true);
      setMessage(exception.message);
      console.log(exception);
    }
  };

  const doDelete = async (itemID) => {
    try {
      const res = await itemService.deleteItem(itemID);

      if (res.error) {
        setIsLoading(false);
        setError(true);
        setMessage(res.error);
        return res;
      }
      setIsLoading(false);
      setTimeout(function () {
        setItems(items.filter((item) => item.id !== itemID));
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

  const doUpdate = async (itemID, newItem) => {
    try {
      const res = await itemService.update(itemID, newItem);

      if (res.error) {
        setIsLoading(false);
        setError(true);
        setMessage(res.error);
        return res;
      }
      setIsLoading(false);
      setTimeout(function () {
        setItems(
          items.map((item) => {
            if (itemID === item.id) {
              return { ...item, ...newItem };
            }

            return item;
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
    return (
      <div>
        <h1>{message}</h1>
        <Button
            onClick={() => {
              setError(false);
              setMessage("");
              history.push("/items");
            }}
            color="primary"
            variant="contained">
              Return to Items
          </Button>
      </div>
    );
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
              <SearchItems />
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
              <Button
                onClick={() => {
                  history.push("/collections");
                }}
                color="primary"
              >
                {collection.name} Collection
              </Button>
              {">>"}
              <Button color="primary" color="secondary">
                Public Items
              </Button>
            </Grid>
            {/* End Row */}

            {/* single row of nothing. Im using this to space things out */}
            <Grid item xs={12} md={12} lg={12} />

            {/* Begin Row */}
            <Grid item xs={1} md={1} lg={1} />
            <Grid item xs={11} sm={9} md={5} lg={4}>
              <span id="displayItem">
                <h1>{collection.name} Items</h1>
              </span>
              <ItemForm items={items} />
              {error && <div>{message}</div>}
            </Grid>
            <Grid item xs={2} sm={3} md={1} lg={2} />
            <Grid item xs={10} sm={9} md={4} lg={5}>
              <CreateItemForm keys={keys} />
            </Grid>
            {/* End Row */}

            <Grid item xs={12} md={12} lg={12} />
          </Grid>
        </ApiContext.Provider>
      </div>
    );
  }
}

export default Items;
