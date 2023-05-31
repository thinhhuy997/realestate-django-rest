import pandas as pd
from scipy.spatial.distance import cdist
from sklearn.preprocessing import MinMaxScaler


class Recommender():
    def __init__(self, user_data, database, top=5, sort_by="id"):

        self.user_last_visited = pd.DataFrame(user_data, index=[0])
        uid = self.user_last_visited["id"].tolist()[0]
        # print(type(uid))
        self.database = pd.DataFrame(database)

        self.database = self.database.append(self.user_last_visited)
        self.nlargest = top
        self.sort_by = sort_by

        self.new_cal_cols = ["region codes", "area", "price", "mat_tien",
                             "direction codes", "duong_vao", "bedroom_number", "toilet_number", "legal codes"]

        # self.database = database.copy()

        self.normalize_data()
        # self.sample = self.database.copy()
        self.user_last_visited = self.database.iloc[-1:]

        self.scaler = MinMaxScaler()
        self.scaler.fit(self.database[self.new_cal_cols])

    def convert_price(self, price, area):
        if price is None:
            return 0
        if price == "Thỏa thuận":
            return 0
        else:
            try:
                prices = price.split(" ")
            except:
                return 0
            n_price = 0
            if "tỷ" in prices[1]:
                if "/m" in prices[1]:
                    n_price = float(prices[0]) * 100 / area
                    # price = float(prices[0]) * area
                else:
                    n_price = float(prices[0]) * 100 / area
                    # price = float(prices[0])
                return n_price

            if "triệu" in prices[1]:
                if "/m" in prices[1]:
                    n_price = float(prices[0])
                    # price = float(prices[0]) * area / 1000
                else:
                    n_price = float(prices[0]) / area
                    # price = float(prices[0]) * area / 1000
                return n_price

            if "nghìn" in prices[1]:
                n_price = float(prices[0]) / 1000
                # price = float(prices[0]) * area / 1000000
                return n_price

        return 0

    def normalize_data(self):
        # self.user_last_visited["price"] = self.user_last_visited.apply(
        #     lambda row: self.convert_price(row["price"], row["area"]), axis=1)
        self.database["price"] = self.database.apply(
            lambda row: self.convert_price(row["price"], row["area"]), axis=1)

        convert_col = ["area", "mat_tien", "duong_vao",
                       "bedroom_number", "toilet_number"]

        for col in convert_col:
            self.database[col] = self.database[col].astype('float')

#
        self.database['phap_ly'] = self.database['phap_ly'].astype(
            'category')
        self.database['huong_nha'] = self.database['huong_nha'].astype(
            'category')
        self.database['region'] = self.database['region'].astype(
            'category')

        self.database['legal codes'] = pd.Categorical(
            self.database['phap_ly']).codes
        self.database['direction codes'] = pd.Categorical(
            self.database['huong_nha']).codes
        self.database['region codes'] = pd.Categorical(
            self.database['region']).codes

        self.database = self.database.drop(
            columns=["phap_ly", "huong_nha", "region"])
#
# #
#         self.user_last_visited['phap_ly'] = self.user_last_visited['phap_ly'].astype(
#             'category')
#         self.user_last_visited['huong_nha'] = self.user_last_visited['huong_nha'].astype(
#             'category')
#         self.user_last_visited['region'] = self.user_last_visited['region'].astype(
#             'category')

#         self.user_last_visited['legal codes'] = pd.Categorical(
#             self.user_last_visited['phap_ly']).codes
#         self.user_last_visited['direction codes'] = pd.Categorical(
#             self.user_last_visited['huong_nha']).codes
#         self.user_last_visited['region codes'] = pd.Categorical(
#             self.user_last_visited['region']).codes

#         self.user_last_visited = self.user_last_visited.drop(
#             columns=["phap_ly", "huong_nha", "region"])
#
        pass

    def get_recommended(self):
        # Apply scaler transform to self.database and
        # self.user_last_visited for normalizing data.
        self.database[self.new_cal_cols] = self.scaler.transform(
            self.database[self.new_cal_cols]
        )
        self.user_last_visited[self.new_cal_cols] = self.scaler.transform(
            self.user_last_visited[self.new_cal_cols]
        )

        # Apply Euclidean for calculate distance data_same_region.
        # and self.user_last_visited
        self.database["score"] = cdist(
            self.database[self.new_cal_cols],
            self.user_last_visited[self.new_cal_cols],
            metric="euclidean",
        )

        # Extract sorted "id" (self.sort_by) to list.
        df_result = self.database.sort_values("score", ascending=True)
        recommended_id = df_result[self.sort_by].values.tolist()

        # Try to remove last visited post's id from database to prevents.
        # this will be most similar
        visited_id = self.user_last_visited[self.sort_by].values.tolist()[0]
        try:
            recommended_id.remove(visited_id)
        except:
            pass

        # Create pandas.DataFrame() contains most similar posts from user's data.
        recommended_posts = pd.DataFrame(columns=self.database.columns)

        for ordered_id in recommended_id:
            recommended_posts = pd.concat(
                [
                    recommended_posts,
                    self.database[self.database[self.sort_by] == ordered_id],
                ],
                ignore_index=True,
            )

        # Get top nlargest item.
        if not self.nlargest == None:
            return recommended_posts.head(self.nlargest)["id"].tolist()

        return recommended_posts["id"].tolist()
