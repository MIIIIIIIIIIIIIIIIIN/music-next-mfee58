import React from "react";
import { AllFonts } from "@/components/basic-fonts/allfonts";
import { FontBold } from "@/components/basic-fonts/allfonts-bold";
import { Color } from "@/components/public/basic-colors/color";
import DateAndPrice from "@/components/basic-fonts/date-and-price";
import { Quantity } from "@/components/quantity/quantity";
import { AddToCartBar } from "@/components/public/addtocart-bar/add-to-cart";

export default function Font() {
  return (
    <>
    <AllFonts />
    <hr />
    <FontBold />
    <hr />
    <Color />
    <hr />
    <DateAndPrice />
    <hr />
    <Quantity />
    </>
    
  );
}

