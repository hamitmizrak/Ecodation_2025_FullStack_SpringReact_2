package com.hamitmizrak.data.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.util.Date;

// ENTITY
@Entity(name="Registers")
@Table(name="registers")
public class RegisterEntity implements Serializable {

    // Register ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="register_id")
    private Integer registerId;

    // System Date
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date systemCreatedDate;

    // Nickname
    @Column(name="nick_name")
    private String registerNickname;

    // Name
    private String registerName;

    // Surname
    private String registerSurname;

    // Email Address
    @Column(name="email_address")
    private String registerEmail;

    // Password
    private String registerPassword;

    // Roles

}

