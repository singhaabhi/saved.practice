import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Pressable,
  TouchableOpacity,
  Image,
  FlatList,
  ToastAndroid,
} from "react-native";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";
import Flame from "../../Assets/Svg/Flame";
import { colors, commons_style } from "../../Style/RouteStyle";
import product_style from "../../Style/ProductStyle";
import { AirbnbRating } from "react-native-ratings";
/*Custom Components*/
import TextInfo, { TextHeading } from "../../Components/AppText";
import ProductCard from "../../Components/ProductCard";
import BottomSheet from "../../Components/BottomSheet";
import {
  SpaceTop,
  SpaceLeft,
  SpaceBottom,
  MainHeaderWithScrollView,
  SafeAreaHorizontal,
  BorderiLine,
  MianButton,
  AfterComplete,
} from "../../Components/CommonComp";
import { productimagedir } from "../../Components/ApiFunction";
import { useProductContext } from "../../Context/ProductContext";
import { filterByCategory } from "../../Components/PureJavascript";
import RatingGraph from "../../Components/RatingGraph";
import ChevronDown from "../../Assets/Svg/ChevronDown";
import PlusIcon from "../../Assets/Svg/Plus.svg";
import CheckIcon from "../../Assets/Svg/Check.svg";
import HomeStyle from "../../Style/HomeStyle";
import ProductReview, {
  ProductReviewCard,
} from "../../Components/ProductReview";
const Product = (props) => {
  const { navigation } = props;
  const params = props.route.params;
  const { products, addToTruck, truckItemInfo } = useProductContext();
  const [product, setProduct] = useState([]);

  const tmpProducts = [...products];
  const [packingtype, setPackingtype] = useState("");
  useEffect(() => {
    const result = tmpProducts.filter((curElem) => {
      return curElem["product_id"] === params;
    });
    setProduct(...result);
  }, [params]);

  // Product review modal ref
  const productReviewRef = useRef(null);
  // product pack type selection sheet ref
  const packSelection = useRef(null);

  const productPackingInfo = () => {
    if (product.packing_info) {
      const packing = packingtype
        ? packingtype
        : product.packing_info[0].packaging_type;
      return product.packing_info.find((curElem) => {
        return curElem["packaging_type"] === packing;
      });
    }
  };
  // product info loading
  if (!product.packing_info) {
    return <AfterComplete status={true} />;
  }
  return (
    <>
      <MainHeaderWithScrollView
        navigation={props.navigation}
        ScreenName={"Product Details"}
        HeaderBackButton={true}
      >
        <SpaceTop gap={20} />
        <SafeAreaHorizontal>
          {/* *********Brand********** */}
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() =>
              navigation.navigate("ProductsByBrand", {
                brandId: product.brand_id,
              })
            }
          >
            <TextHeading Size={15}>Brand </TextHeading>
            <TextInfo Size={13} SpaceLeft={5}>
              {product.brand_name}
            </TextInfo>
          </Pressable>
          {/* **********Product Name*********** */}
          <TextHeading SpaceTop={10} Size={16}>
            {product.product_name}
          </TextHeading>
          {/***********Show Price And Product Rateing*************/}
          <View style={product_style.ShowPriceOrRateing}>
            <View>
              <TextHeading Color={colors.miangreen}>
                ₹ {productPackingInfo().product_price}
                {"  "}
                <TextHeading Size={14} Color={colors.mainyellow}>
                  Per {productPackingInfo().packaging_type}
                </TextHeading>
              </TextHeading>
              {/* product MRP */}
              <>
                <TextHeading
                  Size={14}
                  Color={colors.mianred}
                  style={{
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                  }}
                >
                  ₹ {productPackingInfo().packing_mrp} MRP
                </TextHeading>
              </>
              <TextInfo Size={12}>Inclusive of all taxes</TextInfo>
            </View>
            <View style={commons_style.flexRowCenter}>
              <AirbnbRating
                type="star"
                count={5}
                defaultRating={product.product_rating.rating}
                size={12}
                selectedColor={colors.brand_color}
                isDisabled={true}
                showRating={false}
              />
              <TextHeading SpaceLeft={10} Size={12} Color={colors.brand_color}>
                ( {product.product_rating.rating} ){" "}
                {product.product_rating.ratingCount}
              </TextHeading>
            </View>
          </View>
          {/* ********Show product category*********** */}
          <SpaceTop gap={20} />
          <View style={commons_style.flexRowCenter}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Products")}
              style={product_style.trending_btn}
            >
              <Flame stroke={colors.brand_color} strokeWidth={1.3} />
              <TextInfo Color={colors.brand_color}>Trending</TextInfo>
            </TouchableOpacity>
            <SpaceLeft gap={20} />
            <Pressable
              onPress={() =>
                navigation.navigate("ProductsByCategory", {
                  categoryId: product.category_id,
                })
              }
            >
              <TextHeading Size={14}>{product.category_name}</TextHeading>
              <BorderiLine color={colors.app_text} height={1} />
            </Pressable>
          </View>
          {/*************Show product images****************/}
          <View style={product_style.ShowProductImagesCon}>
            <Swiper
              autoplay={false}
              autoplayTimeout={4}
              showsPagination={true}
              showsButtons={false}
              horizontal={true}
              dot={<View style={product_style.SwiperDotStyle} />}
              activeDot={<View style={product_style.SwiperActiveDotStyle} />}
            >
              {product.product_images.map((data) => {
                return (
                  <View
                    style={product_style.SwiperImageCon}
                    key={data.product_image_id}
                  >
                    <Image
                      source={{
                        uri: productimagedir + data.product_image,
                      }}
                      style={product_style.SwiperImageStyle}
                    />
                  </View>
                );
              })}
            </Swiper>
          </View>
          {/* **********End Image View************ */}
          <SpaceTop gap={50} />
          <BorderiLine color={colors.shadow_color} height={2} opacity={0.2} />
          <SpaceTop gap={20} />
          <View style={commons_style.flexRowSpaceBetween}>
            <TextHeading>Package</TextHeading>
            <TouchableOpacity
              onPress={() => packSelection.current.toggle()}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 8,
                borderRadius: 50,
                backgroundColor: colors.app_highlight_box3,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInfo SpaceRight={6}>
                {packingtype ? packingtype : "Select Package"}
              </TextInfo>
              <ChevronDown stroke={colors.app_text} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
          <SpaceTop gap={30} />
          {/* par unit price  */}
          <View style={[product_style.packingInfoBox]}>
            <TextHeading>Per unit MRP</TextHeading>
            <TextHeading Color={colors.miangreen}>
              ₹ {productPackingInfo().unit_mrp}
            </TextHeading>
          </View>
          {/* packing type mrp */}
          <View style={[product_style.packingInfoBox]}>
            <TextHeading>{productPackingInfo().packaging_type} MRP</TextHeading>
            <TextHeading Color={colors.miangreen}>
              ₹ {productPackingInfo().packing_mrp}
            </TextHeading>
          </View>
          {/* Best Price */}
          <View style={[product_style.packingInfoBox]}>
            <TextHeading>Best Price</TextHeading>
            <TextHeading Color={colors.miangreen}>
              ₹ {productPackingInfo().product_price}
            </TextHeading>
          </View>
          {/* Profit percentage */}
          <View style={[product_style.packingInfoBox]}>
            <TextHeading>Profit</TextHeading>
            <TextHeading>{productPackingInfo().profit_percentage}</TextHeading>
          </View>
          {/* packing qty  */}
          <View style={[product_style.packingInfoBox]}>
            <TextHeading>Quantity</TextHeading>
            <TextHeading>
              {productPackingInfo().packing_quantity}/
              {productPackingInfo().packaging_type}
            </TextHeading>
          </View>
          {/* pack qty type */}
          <View style={[product_style.packingInfoBox]}>
            <TextHeading>Quantity Type</TextHeading>
            <TextHeading>
              {productPackingInfo().packaging_quantity_type}
            </TextHeading>
          </View>
          <SpaceTop gap={50} />
          {/* food type */}
          <View style={[commons_style.flexRowSpaceBetween]}>
            <TextHeading Size={16} style={{ opacity: 0.5 }}>
              Food type
            </TextHeading>
            <TextHeading Size={15} Color={colors.miangreen}>
              {product.product_type}
            </TextHeading>
          </View>
          {/* Varient Panding <></>*/}
          {/* --------Products Description--------- */}
          <TextHeading SpaceTop={50}>Description</TextHeading>
          <>
            <LinearGradient colors={["transparent", "transparent"]}>
              <TextInfo SpaceTop={20} Size={14}>
                {product.product_description}
              </TextInfo>
            </LinearGradient>
          </>
          {/* -----------Product Technical Details-------------- */}
          <TextHeading SpaceTop={40}>Technical Details</TextHeading>
          <>
            <View style={product_style.product_tech_details_con}>
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <TextHeading Size={15} style={{ opacity: 0.5 }}>
                  Technical Details
                </TextHeading>
              </View>
              <>
                {product.technical_info.map((data) => {
                  return (
                    <View
                      key={data.product_techinfo_id}
                      style={product_style.product_tech_details_box}
                    >
                      <View
                        style={product_style.product_tech_details_box.leftBox}
                      >
                        <TextInfo
                          Color={colors.light_text}
                          numberOfLines={1}
                          Size={14}
                        >
                          {data.product_tech_title}
                        </TextInfo>
                      </View>
                      <View
                        style={product_style.product_tech_details_box.rightBox}
                      >
                        <TextInfo numberOfLines={1} Size={14}>
                          {data.product_tech_information}
                        </TextInfo>
                      </View>
                    </View>
                  );
                })}
              </>
            </View>
          </>
          {/* --------------------------------------- */}
          {/* --------Important Information--------- */}
          <TextHeading SpaceTop={50}>Important Information</TextHeading>
          <LinearGradient colors={["transparent", "transparent"]}>
            <TextInfo SpaceTop={20} Size={14}>
              {product.product_disclaimer}
            </TextInfo>
          </LinearGradient>
          {/* --------------------------------------- */}
          <TextHeading SpaceTop={50}>Similar Products</TextHeading>
          {/*  Product card */}
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={filterByCategory(tmpProducts, product.category_id)}
            keyExtractor={(prod) => prod.product_id}
            renderItem={({ item }) => (
              <>
                <View style={[commons_style.Padd_V20]}>
                  <ProductCard
                    route={navigation}
                    style={{ marginRight: 20 }}
                    productInformation={item}
                  />
                </View>
              </>
            )}
          />
          {/*  Product card End*/}
          <SpaceTop gap={15} />
          <BorderiLine color={colors.app_highlight_box} height={2} />
          <SpaceTop gap={15} />
          {/* ----------------Rating graph----------------------- */}
          <>
            <View
              style={[
                commons_style.flexRowSpaceBetween,
                { marginVertical: 20 },
              ]}
            >
              <TextHeading>Reviews</TextHeading>
              <MianButton
                onPress={() => productReviewRef.current.toggleModal()}
                Title="Write a reviews"
                styleOption={{
                  radius: 30,
                }}
              />
            </View>
            <RatingGraph
              ratingData={{
                review: product.product_review,
                rating: product.product_rating,
              }}
            />
            {product.product_review !== null && (
              <>
                {/* Review box */}
                <View
                  style={[commons_style.flexRowCenter, { marginVertical: 20 }]}
                >
                  <TouchableOpacity>
                    <TextInfo Color={colors.mianblue}>Relevent</TextInfo>
                    <BorderiLine color={colors.mianblue} height={1} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <TextInfo SpaceLeft={10}>Recent</TextInfo>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={product.product_review.slice(0, 4)}
                  initialNumToRender={3}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ marginVertical: 20 }}>
                        <ProductReviewCard
                          navigation={navigation}
                          reviewData={{ review: item }}
                        />
                      </View>
                    );
                  }}
                />
                <View style={[commons_style.cxy, { marginVertical: 50 }]}>
                  <MianButton
                    onPress={() =>
                      navigation.navigate("ProductReviews", {
                        reviews: product.product_review,
                      })
                    }
                    Title="See all Reviews"
                    styleOption={{
                      buttonColor: colors.app_text,
                      textColor: colors.app_text,
                      radius: 30,
                      outlineSize: 1,
                    }}
                  />
                </View>
              </>
            )}
            <ProductReview
              ref={productReviewRef}
              productData={{
                productId: product.product_id,
                productName: product.product_name,
                productImage:
                  productimagedir + product.product_images[0].product_image,
              }}
            />
          </>
          <BorderiLine color={colors.app_highlight_box} height={2} />
          {/* ------------------Geev FeedBack--------------------- */}
          <View style={[commons_style.cx, { marginVertical: 50 }]}>
            <TextInfo>We'd love to know your views.😋</TextInfo>
            <Pressable style={HomeStyle.geevFeedback_Button}>
              <TextInfo Color={colors.light_text}>Give Feedback</TextInfo>
            </Pressable>
          </View>
          <SpaceBottom gap={100} />
          {/* --------------------------------------- */}
        </SafeAreaHorizontal>
      </MainHeaderWithScrollView>
      {/* ********Add To Truck******* */}
      <View style={product_style.addToTruckCon}>
        <View style={[commons_style.flexRowCenter]}>
          <TextHeading Size={25} Color={colors.miangreen}>
            ₹ {productPackingInfo().product_price}
          </TextHeading>
          <TextHeading Size={14} SpaceLeft={10}>
            Best Price
          </TextHeading>
        </View>
        <TouchableOpacity
          onPress={() => {
            !packingtype
              ? packSelection.current.toggle()
              : addToTruck({
                  productId: product.product_id,
                  packType: packingtype,
                });
          }}
          style={product_style.addToTruckButton}
        >
          {truckItemInfo(product.product_id) ? (
            <CheckIcon
              stroke={colors.light_text}
              height={"100%"}
              width={"100%"}
            />
          ) : (
            <PlusIcon
              stroke={colors.light_text}
              height={"100%"}
              width={"100%"}
            />
          )}
        </TouchableOpacity>
      </View>
      {/* ********Add To Truck End ******* */}
      {/* Sheet Pack type Selection */}
      <BottomSheet
        ref={packSelection}
        sheetTitle={`Select (${packingtype})`}
        sheetFooter={
          <>
            <View style={product_style.addToTruckCon}>
              <View style={[commons_style.flexRowCenter]}>
                <TextHeading Size={25} Color={colors.miangreen}>
                  ₹ {productPackingInfo().product_price}
                </TextHeading>
                <TextHeading Size={14} SpaceLeft={10}>
                  Best Price
                </TextHeading>
              </View>
              <TouchableOpacity
                onPress={() => {
                  !packingtype
                    ? ToastAndroid.show(
                        "Please Select Packing Type",
                        ToastAndroid.SHORT
                      )
                    : (addToTruck({
                        productId: product.product_id,
                        packType: packingtype,
                      }),
                      packSelection.current.toggle());
                }}
                style={product_style.addToTruckButton}
              >
                {truckItemInfo(product.product_id) ? (
                  <CheckIcon
                    stroke={colors.light_text}
                    height={"100%"}
                    width={"100%"}
                  />
                ) : (
                  <PlusIcon
                    stroke={colors.light_text}
                    height={"100%"}
                    width={"100%"}
                  />
                )}
              </TouchableOpacity>
            </View>
          </>
        }
      >
        {product.packing_info.map((packData) => {
          return (
            <TouchableOpacity
              key={packData.product_packing_id}
              onPress={() => {
                setPackingtype(packData.packaging_type);
              }}
              style={product_style.packSelectionBox({
                selected: packData.packaging_type === packingtype,
              })}
            >
              <View style={commons_style.flexRowCenter}>
                <TextInfo Size={20} Color={colors.miangreen}>
                  ₹ {packData.product_price}
                </TextInfo>
                <TextInfo Size={18} SpaceLeft={10} Color={colors.mainyellow}>
                  Per {packData.packaging_type}
                </TextInfo>
              </View>
              <View style={product_style.selectPackingBoxImage}>
                <Image
                  source={{
                    uri:
                      productimagedir + product.product_images[0].product_image,
                  }}
                  style={[commons_style.imageFixcontain]}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </BottomSheet>
    </>
  );
};

export default Product;
