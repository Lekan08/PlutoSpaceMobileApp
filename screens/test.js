<ScrollView
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      colors={["#F96D02", "#0F0F0f", "#F0F"]}
      onRefresh={onRefresh}
    />
  }
>
  <View
    style={{
      height: "100%",
      maxHeight: "50%",
      backgroundColor: "#F96D02",
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    }}
  ></View>

  <View style={{ paddingHorizontal: 40, marginTop: 25 }}>
    <View style={styles.centeredView}>
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
    {/* <View>
    {products.map((item, index) => {
      console.log(index);
      const imagee = `${item.image}`;
      console.log(imagee);
      return (
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#FEFEFE",
              height: 200,
              width: 190,
              borderRadius: 15,
              padding: 5,
            }}
          >
            <Image
              source={{ uri: imagee }}
              style={{ width: 150, borderRadius: 10, height: 150 }}
            />
            <View
              style={{
                flexDirection: "row",
                width: 150,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Registration")}
                >
                  <View style={styles.loginButton}>
                    <Text style={styles.loginText}>Add To Cart</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: "#FFB9B9",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                  width: 40,
                  borderRadius: 50,
                }}
              >
                <Icon name="cart-outline" size={25} color="#bb32fe" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    })}
  </View> */}

    <Text
      style={{
        color: "#F96D02",
        marginTop: 50,
        fontSize: 17,
      }}
    >
      Clothes
    </Text>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -40, marginTop: 30 }}
    >
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/cart.jpeg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
            marginHorizontal: 20,
          }}
        >
          <Image
            source={require("../images/2.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
            marginHorizontal: 20,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  </View>

  <View style={{ paddingHorizontal: 40, marginTop: 25 }}>
    <Text
      style={{
        color: "#F96D02",
        marginTop: 50,
        fontSize: 17,
      }}
    >
      Clothes
    </Text>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -40, marginTop: 30 }}
    >
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/cart.jpeg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
            marginHorizontal: 20,
          }}
        >
          <Image
            source={require("../images/2.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
            marginHorizontal: 20,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  </View>

  <View style={{ paddingHorizontal: 40, marginTop: 25 }}>
    <Text
      style={{
        color: "#F96D02",
        marginTop: 50,
        fontSize: 17,
      }}
    >
      Clothes
    </Text>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -40, marginTop: 30 }}
    >
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/cart.jpeg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
            marginHorizontal: 20,
          }}
        >
          <Image
            source={require("../images/2.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
            marginHorizontal: 20,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  </View>

  <View style={{ paddingHorizontal: 40, marginTop: 25 }}>
    <Text
      style={{
        color: "#F96D02",
        marginTop: 50,
        fontSize: 17,
      }}
    >
      Clothes
    </Text>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -40, marginTop: 30 }}
    >
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/cart.jpeg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
            marginHorizontal: 20,
          }}
        >
          <Image
            source={require("../images/2.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
            marginHorizontal: 20,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../images/3.jpg")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              {/* <Text
            style={{
              fontFamily: "RobotoRegular",
              fontSize: 11,
              color: "#F96D02",
            }}
          >
            Lorem impsum dolor sit amet, consectetuer adipscing elit,
          </Text> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Add To Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#FFB9B9",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            >
              <Icon name="cart-outline" size={25} color="#bb32fe" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  </View>
</ScrollView>;
