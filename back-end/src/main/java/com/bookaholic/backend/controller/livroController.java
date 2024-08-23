package com.bookaholic.backend.controller;

import java.util.Date;
import java.util.List;

import org.apache.catalina.connector.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookaholic.backend.dto.AvalDto;
import com.bookaholic.backend.dto.SelecAvalDto;

import com.bookaholic.backend.model.Avaliacao;
import com.bookaholic.backend.model.Editora;
import com.bookaholic.backend.model.ErrorResponse;
import com.bookaholic.backend.model.Escritor;
import com.bookaholic.backend.model.Livro;
import com.bookaholic.backend.model.LivroDto;
import com.bookaholic.backend.model.Usuario;
import com.bookaholic.backend.model.testeDto;
import com.bookaholic.backend.repository.AvaliacaoRepository;
import com.bookaholic.backend.repository.EditoraRepository;
import com.bookaholic.backend.repository.EscritorRepository;
import com.bookaholic.backend.repository.ImagemRepository;
import com.bookaholic.backend.repository.LivroRepository;
import com.bookaholic.backend.repository.UsuarioRepository;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/livro")
public class LivroController {

    // separar a avaliação do livro colocando em uma tela separada auxilia a melhorar a API
    
    // colocar a lógica do negocio em um arquivo separado

    @Autowired
    private ImagemRepository imagemRepository;

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired 
    private EscritorRepository escritorRepository;

    @Autowired
    private EditoraRepository editoraRepository;

    @PostMapping("/avaliacao")
    public ResponseEntity<?> inserirAvaliacaoLivro(@RequestBody AvalDto avaliacaodto) {
       Usuario usuario = usuarioRepository.findById(avaliacaodto.id_usuario()).get();
       Livro livro = livroRepository.findById(avaliacaodto.id_livro()).get();
       Avaliacao avaliacao = new Avaliacao(null, new Date(), avaliacaodto.qtd_estrela(), avaliacaodto.descricao(), livro, usuario);
       if(avaliacaoRepository.save(avaliacao) != null){
            return ResponseEntity.ok().build();
       }
       return ResponseEntity.badRequest().build();
    }

    @GetMapping("/livroSemana")
    public List<LivroDto> livroSemana(@RequestParam("title") String title, @RequestParam("title2") String title2) {
        return imagemRepository.findBySemanal(title, title2);
    }

    @GetMapping("/scoreSemanal")
    public List<SelecAvalDto> scoreSemanal() {
        return avaliacaoRepository.findByScoreSemanal();
    }


    @GetMapping(value = "/avaliacao/{id}")
    public ResponseEntity<?> viewAvaliacao(@PathParam("id") Long id) {
        SelecAvalDto aval = avaliacaoRepository.findByAvalId(id);
        if(aval == null){
            return ResponseEntity.ok().body(new ErrorResponse(200, "SEM-AVALIACAO", "esse livro não possui avaliação"));

        } else {
            return ResponseEntity.ok().body(aval);
        }
    
    }

    @GetMapping("/avaliacao/{id}/usuario")
    public ResponseEntity<?> viewAvaliacaoUsuario(@PathParam("id") Long id) 
    {
        return ResponseEntity.ok().body(avaliacaoRepository.findByLivro_id(id));
    }



     @PostMapping
    public ResponseEntity<Livro> addLivro(@RequestBody testeDto dtolivro) {
        Escritor escritor = escritorRepository.findById(dtolivro.escritor_id()).get();
        Editora editora = editoraRepository.findById(dtolivro.editora_id()).get();
        Livro livro = new Livro(null, dtolivro.titulo(), dtolivro.sinopse(), dtolivro.data_lancamento(), escritor, editora, null);
        Livro novoLivro = livroRepository.save(livro);
        return ResponseEntity.status(201).body(novoLivro);
    }

 
    @GetMapping
    public List<Livro> listAllLivro() {
        return livroRepository.findAll();
    }

    @GetMapping("/{id}")
    public List<Livro> listByidEpub(@PathVariable("id") Long id) {
        return livroRepository.listLivroById(id);
    }

}
