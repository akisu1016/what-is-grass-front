import Layout from '../components/Layout';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAddIndexMutation } from '@what-is-grass/shared';
import { useRouter } from 'next/router';

const getLanguages = () => [
  {
    id: 1,
    language: '英語',
  },
  {
    id: 2,
    language: '日本語',
  },
];

type FormValue = {
  index: string;
  languageId: number;
};

const newQuestionFormSchema = yup.object({
  index: yup.string().required(),
  languageId: yup.number().required(),
});

const IndexPage: React.FC = () => {
  const { register, errors, setValue, handleSubmit } = useForm<FormValue>({
    resolver: yupResolver(newQuestionFormSchema),
  });

  const onSubmit: SubmitHandler<FormValue> = ({ index, languageId }) => {
    addPost({ language_id: languageId, index });
  };

  const router = useRouter();
  const keyword = router.query.keyword as string;
  const [addPost, { isLoading }] = useAddIndexMutation();

  useEffect(() => {
    if (keyword) {
      setValue('index', keyword);
    }
  }, [keyword]);

  return (
    <Layout title="New Question">
      <h1>知りたい言葉を質問をしよう</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          この言葉は何語?:
          <select name="languageId" ref={register}>
            {getLanguages().map((l) => (
              <option key={l.id} value={l.id}>
                {l.language}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          質問:
          <input type="text" name="index" ref={register} />
          とはどういう意味ですか
        </label>
        <br />
        {errors.index?.message}
        <br />
        <input
          type="submit"
          disabled={isLoading}
          aria-label="質問を投稿"
          value="投稿"
        />
        {isLoading ? '送信中...' : null}
      </form>
    </Layout>
  );
};

export default IndexPage;
