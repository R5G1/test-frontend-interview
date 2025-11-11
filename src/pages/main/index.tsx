import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getPagesCount } from '../../components/utils/pages';
import style from './index.module.scss';
import { IArray } from '../../components/type/type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro';

function Main() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IArray>();
  const [array, setArray] = useState<any>([]);
  const [arrayResult, setArrayResult] = useState<any>([]);
  const [status, setStatus] = useState(false);
  async function fatchPut() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify({
        array,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => setArrayResult(json))
      .then(() => setStatus(true))
      .catch(() => setStatus(false));
  }
  useEffect(() => {
    fatchPut();
  }, [array]);

  const onSubmit: SubmitHandler<IArray> = (data: IArray, event: any) => {
    setArray(data);
    event.target.reset();
  };

  return (
    <div className={style.main}>
      <div className={style.mainConteiner}>
        <form className={style.mainCForm} onSubmit={handleSubmit(onSubmit)}>
          <input
            className={style.mainCInput}
            placeholder="Ваш номер..."
            minLength={7}
            type="tel"
            {...register('tel', { required: true, pattern: /^[0-9]+$/ })}
            required
          />

          <button className={style.mainCBtn} type="submit">
            <p>
              <FontAwesomeIcon icon={solid('user-secret')} style={{ marginRight: '20px' }} />
              Заказать
            </p>
          </button>
        </form>
        {errors['tel'] && <p className={style.mainCPErrorMessage}>Только числа</p>}
        <p className={style.mainCP}>
          {status ? `результат выполнения запроса ${JSON.stringify(arrayResult.array)} ` : 'Ошибка'}
        </p>
      </div>
    </div>
  );
}

export default Main;
