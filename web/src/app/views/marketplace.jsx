import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import numberAbbreviate from "number-abbreviate";

import adpMarketplaceValuesJson from "../json/marketplace-values.json";
import citiesJson from "../json/cities.json";

import ItemPriceChart from "../modals/item-price-chart.jsx";

import api from "../utils/api.js";
import { ModalContext } from "../utils/context.js";

import "./marketplace.scss";

const HeroBlock = () => {
	return (
		<div className="hero is-info block cm-hero">
			<div className="hero-body">
				<p className="title">Marketplace</p>
			</div>
		</div>
	);
};

const ItemTextInput = ({ filters, setFilters }) => {
	const { t } = useTranslation();

	return (
		<div className="field">
			<p className="control has-icons-left">
				<input
					className="input is-rounded is-info"
					type="text"
					placeholder={t("marketplace:itemTextInput")}
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					spellCheck="false"
					value={filters.searchString}
					onChange={(e) =>
						setFilters({ ...filters, searchString: e.target.value, page: 0 })
					}
				/>
				<span className="icon is-small is-left">
					<i className="fas fa-boxes"></i>
				</span>
			</p>
		</div>
	);
};

const InputResetButton = ({ filters, setFilters }) => {
	return (
		<div className="field">
			<p className="control">
				<button
					className="button is-info is-outlined is-rounded is-fullwidth"
					type="button"
					onClick={() => setFilters({ ...filters, searchString: "", page: 0 })}
				>
					<span className="icon">
						<i className="fas fa-redo-alt"></i>
					</span>
				</button>
			</p>
		</div>
	);
};

const ShopCategorySelect = ({ filters, setFilters }) => {
	const { t } = useTranslation();
	return (
		<div className="field">
			<p className="control">
				<span className="select is-info is-rounded is-fullwidth">
					<select
						value={filters.shopCategory}
						onChange={(e) =>
							setFilters({
								...filters,
								shopCategory: e.target.value,
								shopSubCategory: "",
								page: 0,
							})
						}
					>
						<option value="">{t("adp-marketplace:rollout.category")}</option>
						{adpMarketplaceValuesJson.shopCategory.map((el) => (
							<option key={el} value={el}>
								{t(`adp-marketplace:shopCategory.${el}`)}
							</option>
						))}
					</select>
				</span>
			</p>
		</div>
	);
};

const ShopSubCategorySelect = ({ filters, setFilters }) => {
	const { t } = useTranslation();

	return (
		<div className="field">
			<p className="control">
				<span className="select is-info is-rounded is-fullwidth">
					<select
						value={filters.shopSubCategory}
						onChange={(e) =>
							setFilters({
								...filters,
								shopSubCategory: e.target.value,
								page: 0,
							})
						}
					>
						<option value="">{t("adp-marketplace:rollout.subCategory")}</option>
						{filters.shopCategory === ""
							? null
							: adpMarketplaceValuesJson.shopSubCategory[
									filters.shopCategory
							  ].map((el) => (
									<option key={el} value={el}>
										{t(`adp-marketplace:shopSubCategory.${el}`)}
									</option>
							  ))}
					</select>
				</span>
			</p>
		</div>
	);
};

const TierSelect = ({ filters, setFilters }) => {
	const { t } = useTranslation();

	return (
		<div className="field">
			<p className="control">
				<span className="select is-info is-rounded is-fullwidth">
					<select
						value={filters.tier}
						onChange={(e) =>
							setFilters({ ...filters, tier: e.target.value, page: 0 })
						}
					>
						<option value="">{t("adp-marketplace:rollout.tier")}</option>
						{adpMarketplaceValuesJson.tier.map((el) => (
							<option key={el} value={el}>
								{el}
							</option>
						))}
					</select>
				</span>
			</p>
		</div>
	);
};

const EnchantmentSelect = ({ filters, setFilters }) => {
	const { t } = useTranslation();

	return (
		<div className="field">
			<p className="control">
				<span className="select is-info is-rounded is-fullwidth">
					<select
						value={filters.enchantment}
						onChange={(e) =>
							setFilters({ ...filters, enchantment: e.target.value, page: 0 })
						}
					>
						<option value="">{t("adp-marketplace:rollout.enchantment")}</option>
						{adpMarketplaceValuesJson.enchantment.map((el) => (
							<option key={el} value={el}>
								{el}
							</option>
						))}
					</select>
				</span>
			</p>
		</div>
	);
};

const QualitySelect = ({ filters, setFilters }) => {
	const { t } = useTranslation();

	return (
		<div className="field">
			<p className="control">
				<span className="select is-info is-rounded is-fullwidth">
					<select
						value={filters.quality}
						onChange={(e) =>
							setFilters({ ...filters, quality: e.target.value, page: 0 })
						}
					>
						<option value="">{t("adp-marketplace:rollout.quality")}</option>
						{adpMarketplaceValuesJson.quality.map((el) => (
							<option key={el} value={el}>
								{t(`adp-marketplace:quality.${el}`)}
							</option>
						))}
					</select>
				</span>
			</p>
		</div>
	);
};

const SelectResetButton = ({ filters, setFilters }) => {
	const clickHandler = () => {
		setFilters({
			...filters,
			shopCategory: "",
			shopSubCategory: "",
			tier: "",
			enchantment: "",
			quality: "",
			page: 0,
		});
	};
	return (
		<div className="field">
			<p className="control">
				<button
					className="button is-info is-outlined is-rounded is-fullwidth"
					type="button"
					onClick={clickHandler}
				>
					<span className="icon">
						<i className="fas fa-redo-alt"></i>
					</span>
				</button>
			</p>
		</div>
	);
};

const FiltersBlock = ({ filters, setFilters }) => {
	return (
		<div className="block cm-filters">
			<div className="cm-group-1">
				<ItemTextInput filters={filters} setFilters={setFilters} />
				<InputResetButton filters={filters} setFilters={setFilters} />
			</div>
			<div className="cm-group-2">
				<ShopCategorySelect filters={filters} setFilters={setFilters} />
				<ShopSubCategorySelect filters={filters} setFilters={setFilters} />
				<TierSelect filters={filters} setFilters={setFilters} />
				<EnchantmentSelect filters={filters} setFilters={setFilters} />
				<QualitySelect filters={filters} setFilters={setFilters} />
				<SelectResetButton filters={filters} setFilters={setFilters} />
			</div>
		</div>
	);
};

const CityTabsBlock = ({ city, setCity }) => {
	return (
		<div className="block">
			<div className="tabs is-centered">
				<ul>
					{citiesJson.map((cityJson) => (
						<li
							key={cityJson}
							className={cityJson === city ? "is-active" : ""}
							onClick={() => setCity(cityJson)}
						>
							<a>{cityJson}</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

const SearchResultsBlock = ({ searchResults, city }) => {
	const { t } = useTranslation();

	const [tableEntries, setTableEntries] = useState([]);
	const [fetchTimeout, setFetchTimeout] = useState(null);
	const [isMediaExpanded, setIsMediaExpanded] = useState(false);

	const [modalState, setModalState] = useContext(ModalContext);

	useEffect(async () => {
		if (searchResults === null) return;

		setTableEntries(searchResults.items);

		if (fetchTimeout !== null) {
			clearTimeout(fetchTimeout);
		}

		const timeout = setTimeout(async () => {
			const compiledSearchResults = [];
			for (const item of searchResults.items) {
				const currentPrices = await api.fetchCurrentPrices(
					item.uniqueName,
					item.enchantment,
					item.quality,
					citiesJson
				);

				const compiledSearchResult = { ...item, adp: {} };
				for (const price of currentPrices) {
					compiledSearchResult.adp[price.city] = price;
				}

				compiledSearchResults.push(compiledSearchResult);
			}

			setTableEntries(compiledSearchResults);
		}, 500);

		setFetchTimeout(timeout);
	}, [searchResults]);

	return searchResults === null || searchResults.items.length === 0 ? null : (
		<div className="block">
			<div className="table-container">
				<table className="table is-fullwidth is-bordered is-hoverable">
					<thead>
						<tr className="has-text-centered">
							<th
								className="is-clickable"
								onClick={() => setIsMediaExpanded(!isMediaExpanded)}
							>
								{t("marketplace:tableHeadings.item")}
							</th>
							<th>{t("marketplace:tableHeadings.sellOrderMin")}</th>
							<th>{t("marketplace:tableHeadings.buyOrderMax")}</th>
						</tr>
					</thead>
					<tbody>
						{tableEntries.map((item) => (
							<tr
								key={item._id}
								className="is-clickable"
								onClick={() =>
									setModalState({
										isActive: true,
										component: <ItemPriceChart item={item} city={city} />,
									})
								}
							>
								<td>
									<article
										className={`media ${isMediaExpanded ? "" : "cm-is-short"}`}
									>
										<figure className="media-left">
											<p className="image is-96x96">
												<img
													src={`https://albionsquare.nyc3.digitaloceanspaces.com/items/${item.uniqueName}/${item.enchantment}/${item.quality}/asset.webp`}
												/>
											</p>
										</figure>
										<div className="media-content">
											<h1 className="title is-4">{item.en}</h1>
											<h2 className="subtitle is-5">{`T${item.tier}${
												item.enchantment > 0 ? `.${item.enchantment}` : ""
											} ${t(`adp-marketplace:quality.${item.quality}`)}`}</h2>
										</div>
									</article>
								</td>
								<td className="has-text-centered">
									{item.adp ? (
										<div className="is-size-5">
											{numberAbbreviate(item.adp[city].sell_price_min, 2)}
										</div>
									) : null}
								</td>
								<td className="has-text-centered">
									{item.adp ? (
										<div className="is-size-5">
											{numberAbbreviate(item.adp[city].sell_price_min, 2)}
										</div>
									) : null}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const Pagination = ({ searchResults, filters, setFilters }) => {
	const [paginationState, setPaginationState] = useState(null);

	useEffect(() => {
		if (searchResults === null) return;
		if (searchResults.items.length === 0) setPaginationState(null);

		const { count, page, limit } = searchResults;
		const pages = Math.ceil(count / limit);

		const state = {};
		state.count = count;
		state.page = page;
		state.limit = limit;
		state.pages = pages;
		state.hasPrevious = page > 0;
		state.hasNext = page < pages - 1;
		state.paginationList = [];

		if (pages < 5) {
			for (let i = 0; i < pages; ++i) {
				state.paginationList.push(i + 1);
			}
			return;
		}

		if (page < 2) {
			for (let i = 0; i < 3; ++i) {
				state.paginationList.push(i + 1);
			}
			state.paginationList.push(null);
			state.paginationList.push(pages);
		} else if (page > pages - 3) {
			state.paginationList.push(1);
			state.paginationList.push(null);
			for (let i = pages - 3; i < pages; ++i) {
				state.paginationList.push(i + 1);
			}
		} else {
			state.paginationList.push(1);
			state.paginationList.push(null);
			for (let i = page - 1; i <= page + 1; ++i) {
				state.paginationList.push(i + 1);
			}
			state.paginationList.push(null);
			state.paginationList.push(pages);
		}

		setPaginationState(state);
	}, [searchResults]);

	const goToPage = async (page) => {
		if (page !== paginationState.page) {
			setFilters({ ...filters, page });
			window.scrollTo(0, 0);
		}
	};
	return paginationState === null ? null : (
		<nav
			className="pagination is-centered"
			role="navigation"
			aria-label="pagination"
		>
			<button
				type="button"
				className="pagination-previous button is-info"
				disabled={!paginationState.hasPrevious}
			>
				Previous
			</button>
			<button
				type="button"
				className="pagination-next button is-info"
				disabled={!paginationState.hasNext}
			>
				Next page
			</button>
			<ul className="pagination-list">
				{paginationState.paginationList.map((el, i) => (
					<li key={i}>
						{el === null ? (
							<span className="pagination-ellipsis">&hellip;</span>
						) : (
							<button
								type="button"
								onClick={async () => await goToPage(el - 1)}
								className={`pagination-link button ${
									el === paginationState.page + 1 ? "is-info" : ""
								}`}
								aria-label={`Go to page ${el}`}
							>
								{el}
							</button>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default () => {
	const [city, setCity] = useState(citiesJson[0]);
	const [searchResults, setSearchResults] = useState(null);
	const [filters, setFilters] = useState({
		searchString: "",
		shopCategory: "",
		shopSubCategory: "",
		tier: "",
		enchantment: "",
		quality: "",
		page: 0,
		limit: 10,
	});

	useEffect(async () => {
		setSearchResults(
			await api.searchItems(
				Object.fromEntries(
					Object.entries(filters).filter(([key, value]) => value !== "")
				)
			)
		);
	}, [filters]);

	return (
		<div id="marketplace">
			<HeroBlock />
			<FiltersBlock filters={filters} setFilters={setFilters} />
			<CityTabsBlock city={city} setCity={setCity} />
			<SearchResultsBlock searchResults={searchResults} city={city} />
			<Pagination
				searchResults={searchResults}
				filters={filters}
				setFilters={setFilters}
			/>
		</div>
	);
};
