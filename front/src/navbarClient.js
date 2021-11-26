import './navbar.css';
import React from "react";

function navbarClient() {

  return (
    <div>
	  <div>
		<ul class="line-display">
			<li>
				<img class="small-top-logo" src ="images/logo.JPG"/>
			</li><li class="spaced-elements">
				<h5 class="hover-link"> <a href="https://localhost" class="link-no-link">Spécialités</a></h5>
			</li><li class="spaced-elements">
				<h5 class="hover-link"> <a href="https://localhost" class="link-no-link">Actualités</a></h5>
			</li><li class="spaced-elements">
				<h5 class="hover-link"> <a href="https://localhost" class="link-no-link">Boutique</a></h5>
			</li>
			<li class="fix-right">
				<div class="hover-button">
					<button  class="typical_button" >Vous êtes praticien?</button>
				</div>
				<div class="div-input-group" id="connexion-nav-button">
					<button  class="input-noborder">Connexion</button>
					<img class="connexion-small-arrow" src="images/liteArrow.png"/>
				</div>
			</li>
		</ul>
	  </div>
		<div id="float-menu-toShow" class="float-menu" style="visibility: collapse">
			<img class="top-hidden-triangle" src="images/settingsLiteArrow.png"/>
			<div class="main-hidden-square">
				<a class="textButton hover-link" href="https://localhost">Praticien</a>
				<a class="textButton hover-link" href="https://localhost">Personnel</a>
			</div>
		</div>
		<script>
			document.getElementById("connexion-nav-button").onclick = function() {
				var show = document.getElementById("float-menu-toShow")
				if(show.style.visibility=="visible"){
					show.style.visibility="collapse"
				}else{
					show.style.visibility="visible"
				}
			};
		</script>
	</div>
  );
}

export default navbarClient;