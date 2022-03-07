const getStyles = () => ({
  title: {
    fontSize: 50,
    padding: '15px',
    marginBottom: '50px',
    textAlign: 'center',
    color: '#0E185F'
  }
})

const Title = () => {
  const styles = getStyles()

  return <h1 style={styles.title}>Your favorite people and their cars!</h1>
}

export default Title
