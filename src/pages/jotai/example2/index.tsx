import { useAtomValue, useSetAtom, atom } from "jotai";
const animeAtom = atom([
  {
    title: "jimmy",
    year: 1995,
    watched: true,
  },
  {
    title: "chimmy",
    year: 1998,
    watched: false,
  },
]);
const progressAtom = atom((get) => {
  const anime = get(animeAtom);
  return anime.filter((item) => item.watched).length / anime.length;
});
const AnimeList = () => {
  const anime = useAtomValue(animeAtom);

  return (
    <ul>
      {anime.map((item, index) => (
        <li key={index}>{item.title}</li>
      ))}
    </ul>
  );
};

const AddAnime = () => {
  const setAnime = useSetAtom(animeAtom);

  return (
    <button
      onClick={() => {
        setAnime((anime) => [
          ...anime,
          {
            title: "小明",
            year: 1998,
            watched: false,
          },
        ]);
      }}
    >
      添加人物
    </button>
  );
};

const ProgressTracker = () => {
  const progress = useAtomValue(progressAtom);

  return <div>{Math.trunc(progress * 100)}% watched</div>;
};

export const Example2 = () => {
  return (
    <>
      <AnimeList />
      <AddAnime />
      <ProgressTracker />
    </>
  );
};
