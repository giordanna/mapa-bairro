(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{320:function(e,a,t){e.exports=t(756)},325:function(e,a,t){},327:function(e,a,t){},329:function(e,a,t){},541:function(e,a){},543:function(e,a){},575:function(e,a){},576:function(e,a){},624:function(e,a){},626:function(e,a){},649:function(e,a){},756:function(e,a,t){"use strict";t.r(a);var r=t(0),o=t.n(r),n=t(55),i=t.n(n),c=(t(325),t(56)),l=t(57),s=t(60),d=t(58),u=t(61),m=(t(327),t(329),t(76)),p=t(319),f=t(98),h=t.n(f),g=t(129),E=Object(p.a)(m.withScriptjs,m.withGoogleMap)(function(e){return o.a.createElement(m.GoogleMap,{clickableIcons:!1,defaultZoom:15,defaultCenter:{lat:-1.4413,lng:-48.4837},onClick:function(a){return e.pesquisaFoursquare(a.latLng,e.addLista,e.abrirModal)}},e.marcadores.map(function(a,t){return o.a.createElement(v,{key:t,marcador:a,selecionarMarcador:e.selecionarMarcador,marcadorSelecionado:e.marcadorSelecionado,deselecionarMarcador:e.deselecionarMarcador,abrirModalApp:e.abrirModalApp})}))}),v=function(e){function a(){return Object(c.a)(this,a),Object(s.a)(this,Object(d.a)(a).apply(this,arguments))}return Object(u.a)(a,e),Object(l.a)(a,[{key:"render",value:function(){var e=this.props,a=e.marcador,t=e.selecionarMarcador,r=e.deselecionarMarcador,n=e.marcadorSelecionado,i=e.abrirModalApp;return o.a.createElement(m.Marker,{animation:window.google.maps.Animation.DROP,icon:{url:n===a?"http://maps.google.com/mapfiles/ms/icons/green-dot.png":"http://maps.google.com/mapfiles/ms/icons/red-dot.png"},position:{lat:a.location.lat,lng:a.location.lng},onClick:function(){return t(a)}},n&&n.id===a.id&&o.a.createElement(m.InfoWindow,{onCloseClick:function(){return r()}},o.a.createElement("div",{onClick:function(){return i()},className:"infowindow"},o.a.createElement("img",{className:"imagem-infowindow",src:a.bestPhoto.prefix+"height250"+a.bestPhoto.suffix,alt:"Foto de "+a.name}),o.a.createElement("h2",null,a.name),o.a.createElement("p",null,a.categories[0].name),o.a.createElement("p",null,a.location.formattedAddress[0]),o.a.createElement("p",null,"Clique para mais detalhes!"))))}}]),a}(r.Component),b=function(e){function a(){var e,t;Object(c.a)(this,a);for(var r=arguments.length,o=new Array(r),n=0;n<r;n++)o[n]=arguments[n];return(t=Object(s.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(o)))).state={modalOpen:!1,possiveisLocais:[]},t.abrirModal=function(){t.setState({modalOpen:!0})},t.fecharModal=function(){t.setState({modalOpen:!1})},t.addLista=function(e){t.setState({possiveisLocais:e})},t.pesquisaFoursquare=function(e,a,t){var r=[];h()({url:"https://api.foursquare.com/v2/venues/explore",method:"GET",qs:{client_id:"DFT4IMWTELLO00IVL3AHBOBW45LRBGO0D34SY14E155LUCBK",client_secret:"FT25LN2Q2LAI0KMPSY5YEACTC0X2DFXCQKNKB1TQTYLLQ3NC",ll:e.lat()+","+e.lng(),v:"20180323"}},function(e,o,n){if(e)console.error(e);else if(429===JSON.parse(n).meta.code)console.error(JSON.parse(n).meta.errorDetail),r=[{id:"erro",nome:"Erro: n\xe3o foi poss\xedvel recuperar",endereco:"Se voc\xea estiver vendo isso, provavelmente o limite de requisi\xe7\xf5es foi atingido. Aguarde um dia."}];else{var i=JSON.parse(n);i.response.groups[0].items&&(r=i.response.groups[0].items.sort(function(e,a){return e.venue.location.distance-a.venue.location.distance}).map(function(e){return{id:e.venue.id,nome:e.venue.name,endereco:e.venue.location.address,categoria:e.venue.categories[0].name}}),a(r),t())}})},t.buscarDetalhes=function(e,a){"erro"!==e.id&&h()({url:"https://api.foursquare.com/v2/venues/"+e.id,method:"GET",qs:{client_id:"DFT4IMWTELLO00IVL3AHBOBW45LRBGO0D34SY14E155LUCBK",client_secret:"FT25LN2Q2LAI0KMPSY5YEACTC0X2DFXCQKNKB1TQTYLLQ3NC",v:"20180323"}},function(t,r,o){if(t)console.error(t);else if(429===JSON.parse(o).meta.code)console.error(JSON.parse(o).meta.errorDetail);else{var n=JSON.parse(o);e=n.response.venue}a(e)})},t}return Object(u.a)(a,e),Object(l.a)(a,[{key:"render",value:function(){var e=this,a=this.props,t=a.isLateralToggled,r=a.marcadores,n=a.selecionarMarcador,i=a.deselecionarMarcador,c=a.createMarcador,l=a.marcadorSelecionado,s=a.abrirModalApp;return o.a.createElement("main",{className:t?"mapa-toggle":"mapa"},o.a.createElement(E,{pesquisaFoursquare:this.pesquisaFoursquare,selecionarMarcador:n,deselecionarMarcador:i,marcadores:r,marcadorSelecionado:l,abrirModal:this.abrirModal,abrirModalApp:s,addLista:this.addLista,googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyBDk9y-BWlt1u5klFVBGxWocj2DnHV_e9k&libraries=geometry,drawing,places",loadingElement:o.a.createElement("div",{style:{height:"100%"}}),containerElement:o.a.createElement("div",{style:{height:"100%"}}),mapElement:o.a.createElement("div",{style:{height:"100%"}})}),o.a.createElement("div",null,o.a.createElement(g.a,{open:this.state.modalOpen,onClose:this.fecharModal,center:!0},o.a.createElement("h2",null,"Escolha o local que voc\xea gostaria de adicionar:"),this.state.possiveisLocais.map(function(a,t){return o.a.createElement("div",{key:t},o.a.createElement("div",{className:"local-escolher",onClick:function(){e.buscarDetalhes(a,c),e.fecharModal()}},o.a.createElement("h3",null,a.nome),o.a.createElement("p",null,o.a.createElement("strong",null,"Categoria: "),a.categoria),o.a.createElement("p",null,o.a.createElement("strong",null,"Endere\xe7o: "),a.endereco)),o.a.createElement("hr",null))}))))}}]),a}(r.Component),S=function(e){function a(){return Object(c.a)(this,a),Object(s.a)(this,Object(d.a)(a).apply(this,arguments))}return Object(u.a)(a,e),Object(l.a)(a,[{key:"render",value:function(){var e=this.props,a=e.marcadores,t=e.marcadorSelecionado,r=e.selecionarMarcador,n=e.isLateralToggled,i=e.updateQuery,c=e.query;return o.a.createElement("aside",{className:n?"sidebar-toggle":"sidebar"},o.a.createElement("input",{type:"text",className:"entrada-filtro",placeholder:"Filtre aqui... \ud83d\udd0e",value:c,onChange:function(e){return i(e.target.value)}}),a.map(function(e,a){return o.a.createElement("div",{key:a,className:"sidebar-inner"+(t===e?" selecionado":""),onClick:function(){return r(e)}},o.a.createElement("p",null,e.name))}))}}]),a}(r.Component),M=t(318),O=t.n(M),L=t(77),N=function(e){function a(){var e,t;Object(c.a)(this,a);for(var r=arguments.length,o=new Array(r),n=0;n<r;n++)o[n]=arguments[n];return(t=Object(s.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(o)))).state={marcadores:[],isLateralToggled:!1,marcadorSelecionado:null,query:"",modalOpen:!1},t.updateQuery=function(e){t.setState({query:e.trim()})},t.removeMarcador=function(e){t.setState(function(a){return{marcadores:a.marcadores.filter(function(a){return a.id!==e.id})}}),L.NotificationManager.success("O marcador foi deletado!","Sucesso!")},t.createMarcador=function(e){t.setState(function(a){return{marcadores:a.marcadores.concat([e])}}),L.NotificationManager.success("O marcador foi criado!","Sucesso!")},t.selecionarMarcador=function(e){t.setState({marcadorSelecionado:e})},t.deselecionarMarcador=function(){t.setState({marcadorSelecionado:null})},t.abrirModal=function(){t.setState({modalOpen:!0})},t.fecharModal=function(){t.setState({modalOpen:!1,marcadorSelecionado:null})},t.mostrarSobre=function(){L.NotificationManager.info("2018 \xa9 Giordanna De Gregoriis. Feito com React, usando a API do Google Maps e Foursquare","Sobre",6e3)},t}return Object(u.a)(a,e),Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this,a=[];["5572f58a498eef85adf4f1b4","4c310017ac0ab71342201c1e","4d95fca8daec224bf29d0b3e","4eb732a9991165b76327d02e","4bd074c841b9ef3ba113fae5"].map(function(e){h()({url:"https://api.foursquare.com/v2/venues/"+e,method:"GET",qs:{client_id:"DFT4IMWTELLO00IVL3AHBOBW45LRBGO0D34SY14E155LUCBK",client_secret:"FT25LN2Q2LAI0KMPSY5YEACTC0X2DFXCQKNKB1TQTYLLQ3NC",v:"20180323"}},function(e,t,r){if(e)console.error(e);else if(429===JSON.parse(r).meta.code)console.error(JSON.parse(r).meta.errorDetail),L.NotificationManager.error("Houve um problema ao tentar recuperar informa\xe7\xf5es do local","Erro");else{var o=JSON.parse(r);a.push(o.response.venue)}})}),setTimeout(function(){e.setState({marcadores:a})},6e3)}},{key:"toggleLateral",value:function(){this.setState({isLateralToggled:!this.state.isLateralToggled})}},{key:"render",value:function(){var e,a=this;if(this.state.query){var t=new RegExp(O()(this.state.query),"i");e=this.state.marcadores.filter(function(e){return t.test(e.name)})}else e=this.state.marcadores;return o.a.createElement("div",{className:"app"},o.a.createElement("nav",{className:"nav"},o.a.createElement("span",{className:"botao"},o.a.createElement("a",{href:"/"},"Mapa do Umarizal")),o.a.createElement("span",{className:"botao-direita"},o.a.createElement("a",{title:"Mostrar/Esconder Barra lateral",onClick:function(){return a.toggleLateral()}},"\u2630")),o.a.createElement("span",{className:"botao-direita"},o.a.createElement("a",{onClick:this.mostrarSobre},"Sobre"))),o.a.createElement(S,{query:this.state.query,updateQuery:this.updateQuery,isLateralToggled:this.state.isLateralToggled,marcadores:e,selecionarMarcador:this.selecionarMarcador,marcadorSelecionado:this.state.marcadorSelecionado}),o.a.createElement(b,{isLateralToggled:this.state.isLateralToggled,marcadores:e,selecionarMarcador:this.selecionarMarcador,deselecionarMarcador:this.deselecionarMarcador,marcadorSelecionado:this.state.marcadorSelecionado,createMarcador:this.createMarcador,abrirModalApp:this.abrirModal}),o.a.createElement("div",null,o.a.createElement(g.a,{open:this.state.modalOpen,onClose:this.fecharModal,center:!0},this.state.marcadorSelecionado&&o.a.createElement("div",null,o.a.createElement("h2",null,this.state.marcadorSelecionado.name),o.a.createElement("p",null,o.a.createElement("strong",null,"Categoria: "),this.state.marcadorSelecionado.categories[0].name),this.state.marcadorSelecionado.tips&&o.a.createElement("p",null,o.a.createElement("strong",null,"Top coment\xe1rio: "),o.a.createElement("em",null,this.state.marcadorSelecionado.tips.groups[0].items[0].text)," - por "," ",o.a.createElement("a",{target:"_blank",className:"link",href:this.state.marcadorSelecionado.tips.groups[0].items[0].canonicalUrl},this.state.marcadorSelecionado.tips.groups[0].items[0].user.firstName)),this.state.marcadorSelecionado.price&&o.a.createElement("p",null,o.a.createElement("strong",null,"Pre\xe7o: "),"\ud83d\udcb5 "+this.state.marcadorSelecionado.price.message),o.a.createElement("p",null,o.a.createElement("strong",null,"Avalia\xe7\xe3o: "),"\u2b50 "+this.state.marcadorSelecionado.rating),o.a.createElement("p",null,o.a.createElement("strong",null,"Curtidas: "),"\ud83d\udc4d "+this.state.marcadorSelecionado.likes.count),o.a.createElement("p",null,o.a.createElement("strong",null,"Endere\xe7o: "),"\ud83d\udccd "+this.state.marcadorSelecionado.location.formattedAddress[0]+" - "+this.state.marcadorSelecionado.location.formattedAddress[1]),o.a.createElement("p",null,o.a.createElement("strong",null,o.a.createElement("a",{target:"_blank",className:"link",href:this.state.marcadorSelecionado.canonicalUrl},"Veja mais no Foursquare"))),o.a.createElement("a",{className:"botao-apagar",onClick:function(){a.removeMarcador(a.state.marcadorSelecionado),a.fecharModal()}},"Apagar"),o.a.createElement("img",{className:"imagem",src:this.state.marcadorSelecionado.bestPhoto.prefix+"height500"+this.state.marcadorSelecionado.bestPhoto.suffix,alt:"Foto de "+this.state.marcadorSelecionado.name})))),o.a.createElement(L.NotificationContainer,null))}}]),a}(r.Component),w=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function y(e,a){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),a&&a.onUpdate&&a.onUpdate(e)):(console.log("Content is cached for offline use."),a&&a.onSuccess&&a.onSuccess(e)))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(o.a.createElement(N,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/mapa-bairro",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var a="".concat("/mapa-bairro","/service-worker.js");w?(function(e,a){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):y(e,a)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(a,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):y(a,e)})}}()}},[[320,2,1]]]);
//# sourceMappingURL=main.e3fac969.chunk.js.map