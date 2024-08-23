package com.bookaholic.backend.repository;


import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bookaholic.backend.model.Escritor;
import com.bookaholic.backend.model.Usuario;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

public interface EscritorRepository extends JpaRepository<Escritor, Long> {

    /**
     * @return
     */
    @Query(nativeQuery = true,value = "SELECT id_escritor, nome FROM escritor")
    List<Escritor> findAllNameIdEList();

    
  
    @Query("SELECT new com.bookaholic.backend.model.Escritor (e.id_escritor, e.sobre_autor, e.nome, e.data_nascimento) FROM livro l  JOIN l.escritor e where l.id_livro =  :id")
    Escritor findEscritorById_Livro(Long id);
    
}
