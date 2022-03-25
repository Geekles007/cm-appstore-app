import React, {memo, useEffect} from "react";
import {useFetch} from "../../../../hooks/use-fetch";
import AppCardUI from "./children/app-card";
import AppViewUI from "./children/app-view";
import EmptyStateUI from "../../../../common/empty-state";
import {IApp} from "../../../../model/IApp";
import KeyBuilder from "../../../../utils/KeyBuilder";
import { apiHost } from "../../../../constants";
import AppStore from "../../../../stores/AppStore";

const AppListUI = () => {

    const {status, data: {data}, error, refetch} = useFetch(`${apiHost}/applications`);

    if(status === "fetching") return <>Loading...</>;
    if(status !== "fetched") return <EmptyStateUI refetch={refetch} />;

    const values = data.items ?? [];
    
    if(values.length <= 0) return <EmptyStateUI refetch={refetch} />;

    return (
        <AppViewUI list={values} />
    );

}

export default memo(AppListUI);
