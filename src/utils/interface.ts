export interface BannerItem {
  id: number;
  title: string;
  name: string;
  overview: string;
  vote_average: number;
  popularity: number;
  backdrop_path: string;
  poster_path: string;
}

export interface MovieState {
  bannerData: BannerItem[];
  imageUrl: string;
}

export interface RootState {
  movie: MovieState;
}

export interface AccountMenuProps {
  visible?: boolean;
}

export interface CardProps {
  data: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    popularity?: number;
    release_date?: string;
    vote_average?: number;
  };
  category?:
    | "trendingData"
    | "trending"
    | "popular"
    | "now-playing"
    | "top-rated"
    | "movie"
    | "tv"
    | "similarData"
    | "search";
  index?: number;
}

export interface NavigationItem {
  label: string;
  link: string;
  icon: JSX.Element;
}

export interface MobileNavItem {
  label: string;
  link: string;
  icon: JSX.Element;
}

export interface Movie {
  name: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  popularity?: number;
  release_date?: string;
  vote_average?: number;
}

export interface MovieSectionProps {
  title: string;
  data: Movie[];
  category:
    | "trendingData"
    | "trending"
    | "popular"
    | "now-playing"
    | "top-rated"
    | "movie"
    | "tv"
    | "similarData"
    | "search";

  index?: number;
}
export interface MovieSectionDetailProps {
  similarTitle: string;
  similarData: any;
  recommendationTitle: string;
  recommendationData: any;
  category: "movie" | "tv";
}

export interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

export interface MovieData {
  title?: string;
  name?: string;
  tagline?: string;
  backdrop_path?: string;
  poster_path?: string;
  vote_average?: number;
  popularity?: number;
  runtime?: number;
  overview?: string;
  status?: string;
  release_date?: string;
  revenue?: number;
}

export interface CastData {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface ProfileCardProps {
  imageUrl?: string;
  name: string;
}
