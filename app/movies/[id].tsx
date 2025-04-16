import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 font-normal text-sm">{label}</Text>
      <Text className="text-light-100 font-bold text-sm mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => getMovieDetails(id as string));
  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm ">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm ">
              {movie?.runtime} min
            </Text>
          </View>
          <View className="flex-row items-center px-2 py-1 rounded-md bg-dark-100 gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              {movie?.vote_count} votes
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres?.map((genre) => genre.name).join(" - ") || "N/A"
            }
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue / 1_000_000)} million`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((company) => company.name)
                .join(" - ") || "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute bottom-5 left-0 right-0 mx-5 rounded-lg py-3.5 bg-accent flex flex-row items-center justify-center z-50"
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white text-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
