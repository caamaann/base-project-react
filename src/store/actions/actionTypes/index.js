//..........................................................................................................
//                  ACTION CREATOR
//..........................................................................................................

export function actionPending(type) {
  return {
    type: type,
  };
}

export function actionSuccess(type, data) {
  return {
    type: type,
    data: data,
  };
}

export function actionError(type, error) {
  return {
    type: type,
    error: error,
  };
}
