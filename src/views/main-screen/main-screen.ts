import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import './main-screen.css';

class mainScreen {
    formPrincipal: HTMLFormElement;
    txtPesquisa: HTMLInputElement;
    btnLimpar: HTMLButtonElement;

    pnlConteudo: HTMLDivElement;

    private pokemonService: PokemonService;

    constructor() {
        this.pokemonService = new PokemonService();
        this.registrarElementos();
        this.registrarEventos();

        this.pokemonService.selecionarPokemons()
            .then(pokemons => this.gridPokemons(pokemons));
    }

    private gridPokemons(pokemons: Pokemon[]): any {
        const pnlGrid = document.createElement('div');
            pnlGrid.classList.add('grid-pokemons');
    
        for (let pokemon of pokemons) {
            const card = this.obterCard(pokemon);
    
            pnlGrid.appendChild(card);
        }
    
        this.pnlConteudo.appendChild(pnlGrid);
    }
    
    private obterCard(pokemon: Pokemon): HTMLDivElement {
        const imagem = document.createElement("img");
        const id = document.createElement("p");
        const nomePokemon = document.createElement("p");
        const tipo = document.createElement("p");
    
        nomePokemon.textContent = pokemon.nome;
        id.textContent = pokemon.id.toString();
        imagem.src = pokemon.spriteUrl;
        tipo.textContent = `${pokemon.tipo.charAt(0).toUpperCase() + pokemon.tipo.slice(1)}`;
        tipo.style.backgroundColor = this.colorirConformeTipoPokemon(pokemon.tipo);
        tipo.classList.add('tipo');
    
        const cardPokemon = document.createElement('div');
        cardPokemon.classList.add('card-pokemon');
    
        cardPokemon.appendChild(imagem);
        cardPokemon.appendChild(id);
        cardPokemon.appendChild(nomePokemon);
        cardPokemon.appendChild(tipo);
    
        return cardPokemon;
    }
    
    registrarElementos(): void {
        this.formPrincipal = document.getElementById("formPrincipal") as HTMLFormElement;
        this.txtPesquisa = document.getElementById("txtPesquisa") as HTMLInputElement;
        this.btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;
        this.pnlConteudo = document.getElementById("pnlConteudo") as HTMLDivElement;
    }
    
    registrarEventos(): void {
        this.formPrincipal
            .addEventListener('submit', (sender) => this.buscar(sender));
    
        this.btnLimpar
            .addEventListener('click', () => this.limparCard());
    }
    
    buscar(sender: Event): void {
        sender.preventDefault();
    
        if (!this.txtPesquisa.value) return;
    
        const nome = this.txtPesquisa.value;
        this.txtPesquisa.value = '';
        
        this.limparCard();
        this.pesquisarPokemonPorNome(nome);
    }
    
    limparCard(): void {
        this.pnlConteudo.querySelector('.card-pokemon')
            ?.remove();
    }
    
    private pesquisarPokemonPorNome(nome: string): void {
        this.pokemonService.selecionarPokemonPorNome(nome)
            .then(poke => this.gerarCard(poke))
            .catch((erro: Error) => console.log(erro));
    }
    
    private gerarCard(pokemon: Pokemon): void {
        const lblId = document.createElement("p");
        const lblNome = document.createElement("p");
        const imgSprite = document.createElement("img");
        const lblTipo = document.createElement("p");
    
        lblId.textContent = pokemon.id.toString();
        lblNome.textContent = pokemon.nome;
        imgSprite.src = pokemon.spriteUrl;
        lblTipo.textContent = `${pokemon.tipo.charAt(0).toUpperCase() + pokemon.tipo.slice(1)}`;
        lblTipo.style.backgroundColor = this.colorirConformeTipoPokemon(pokemon.tipo);
        lblTipo.classList.add('tipo');
    
        const pnlPokemon = document.createElement('div');
        pnlPokemon.classList.add('card-pokemon');
    
        pnlPokemon.appendChild(imgSprite);
        pnlPokemon.appendChild(lblId);
        pnlPokemon.appendChild(lblNome);
        pnlPokemon.appendChild(lblTipo);
    
        
        if (this.pnlConteudo.firstChild) {
            this.pnlConteudo.insertBefore(pnlPokemon, this.pnlConteudo.lastChild);
        } else {
            this.pnlConteudo.appendChild(pnlPokemon);
        }
    }

    private colorirConformeTipoPokemon(tipo: string): string {
        switch (tipo) {
            case 'electric':
                return '#FFD700';

            case 'fire':
                return '#FF4500';

            case 'water':
                return '#1E90FF';

            case 'grass':
                return '#00FF00';

            case 'ice':
                return '#ADD8E6';

            case 'fighting':
                return '#FF6347';

            case 'poison':
                return '#9932CC';

            case 'ground':
                return '#D2B48C';

            case 'flying':
                return '#87CEEB';

            case 'psychic':
                return '#FF69B4';

            case 'bug':
                return '#32CD32';

            case 'rock':
                return '#A0522D';

            case 'ghost':
                return '#8B008B';

            case 'dark':
                return '#2F4F4F';

            case 'steel':
                return '#708090';  

            case 'fairy':
                return '#FF1493';

            default:
                return '#808080';
        }
    }
}

window.addEventListener('load', () => new mainScreen());