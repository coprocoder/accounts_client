export interface ISignError {
  title: string;
  text: string;
}

export const onSignError = (error: any) => {
  console.log({error});
  let errResponse;
  if (!error.response) {
    errResponse = {
      title: "Нет сети",
      text: "Пожалуйста, проверьте подключение к сети",
    };
  } else if (error.response.status == 500) {
    errResponse = {
      title: "Ошибка на сервере",
      text: "Пожалуйста, обновите страницу и повторите попытку позже",
    };
  } else if (error.response.status == 401) {
    errResponse = {
      title: "Некоррректные данные",
      text: error.response.data.message,
    };
  } else alert(error);

  return errResponse;
};
