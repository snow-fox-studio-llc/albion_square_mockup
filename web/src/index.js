import $ from "cash-dom";

$(document).ready(() => {
	const navbarBurger = $(".navbar-burger");
	const navbarMenuHeroA = $("#navbarMenuHeroA");

	navbarBurger.on("click", (e) => {
		e.preventDefault();
		navbarMenuHeroA.toggleClass("is-active");
		navbarBurger.toggleClass("is-active");
	});
});
