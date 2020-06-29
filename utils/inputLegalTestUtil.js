function inputLegalTest(params, sync){

  tt.BaaS.invoke('checkTextLegal', {
      params,
    }, sync).then(res=>{
    console.log('res%%%%%%%%%', res);
  }, err =>{
    console.log('err', err)
  })
}