import { Fragment } from "react";

import DefaultLayout from "../layouts/default.jsx";

export default function Marketplace() {
	return <Fragment></Fragment>;
}

Marketplace.getLayout = (page) => {
	return <DefaultLayout>{page}</DefaultLayout>;
};
